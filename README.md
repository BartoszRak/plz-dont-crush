# Plz Dont Crush API

The rest of important documents:
- [Design Docs](design-docs.md)

## Development
### Preparing & starting the app
1. Install dependencies
`yarn install`
2. Copy `.env.example` file to the root directory as `.env` file.
3. Start docker containers
`docker-compose up`
4. Run  migrations
`yarn migration:run`
5. Finally - start the app
`yarn start:dev`

#### Docker containers
There are basically two images required by your app - `postgres` and `redis`. You are free to run them both by one command
```
docker-compose up
```
or run them one by one by commands
```
docker-compose up db // Postgres
docker-compose up redis // Redis
```
#### Migrations
Because of using postgres after any change in any `.entity.ts` file you have to generate or create a new migration. Also other commands could be helpful.

- Generate new migration (auto-detects changes)
`yarn migration:run`

- The same as above but for production app (`./dist`)
`yarn migration:run prod`

- Create new migration
`yarn migration:create`

- Run all not-runned migrations (automatically recognizes which one is done and which one is not)
`yarn migration:run`

- The same as above but for production app (`./dist`)
- `yarn migration:run:prod`

- Revert last migration
`yarn migration:revert`

- The same as above but for production app (`./dist`)
`yarn migration:revert:prod`

