FROM node:14.15.1-alpine AS builder

RUN addgroup -S builder && adduser -S builder -G builder
RUN mkdir -p /home/builder/app
RUN chown -R builder:builder /home/builder
WORKDIR /home/builder/app
USER builder

COPY --chown=builder:builder package.json .
COPY --chown=builder:builder yarn.lock .
RUN yarn

COPY --chown=builder:builder . .
RUN yarn build

RUN yarn install --production --ignore-scripts --prefer-offline

FROM node:14.15.1-alpine

RUN addgroup -S api && adduser -S api -G api
RUN mkdir -p /home/api/app
RUN chown -R api:api /home/api
WORKDIR /home/api/app
USER api

COPY --from=builder --chown=api:api /home/builder/app/dist dist
COPY --from=builder --chown=api:api /home/builder/app/node_modules node_modules
COPY --from=builder --chown=api:api /home/builder/app/ormconfig.js .
COPY --from=builder --chown=api:api /home/builder/app/ormconfig.prod.js .
COPY --from=builder --chown=api:api /home/builder/app/package.json .
COPY --from=builder --chown=api:api /home/builder/app/yarn.lock .

ENV NODE_ENV production
