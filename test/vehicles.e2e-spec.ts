import { AuthDto } from '@main/auth/dto/auth.dto'
import { SignUpDto } from '@main/auth/dto/sign-up.dto'
import { INestApplication } from '@nestjs/common'
import * as dotenv from 'dotenv'
import * as request from 'supertest'
import { bootstrapSwapi, ThirdPartyPort } from './third-party'
import { init } from './utils/init'

dotenv.config()

process.env.SWAPI_BASE_URL = `http://localhost:${ThirdPartyPort.Swapi}`

const signUpPath = '/auth/sign-up'
const multipleVehiclesPath = '/vehicles'
const getSingleVehiclePath = (id: number) => `/vehicles/${id}`

let app: INestApplication
let swapiApp: INestApplication
let result: request.Response

describe('Vehicles (e2e)', () => {
  beforeAll(async () => {
    swapiApp = await bootstrapSwapi()
  })

  afterAll(async () => {
    await swapiApp.close()
  })

  init(async ({ application, done }) => {
    app = application
    done()
  })

  describe('when attempting to sign up', () => {
    const mockedSignUpData: SignUpDto = {
      email: 'mocked@email.com',
      password: '123abcABC',
    }
    let signUpResult: AuthDto

    beforeEach(async () => {
      result = await request(app.getHttpServer())
        .post(signUpPath)
        .send(mockedSignUpData)
      signUpResult = result.body
    })

    it('returns 201 response with user data and token', () => {
      expect(result.status).toBe(201)
      expect(result.body).toMatchInlineSnapshot(
        {
          token: {
            value: expect.any(String),
          },
        },
        `
        Object {
          "token": Object {
            "value": Any<String>,
          },
          "user": Object {
            "id": __ID__,
            "email": "mocked@email.com",
            "swapiCharacter": Object {
                "id": __ID__,
                "name": "Luke Skywalker",
                "planetId": 1,
                "filmsIds": Array [
                    1,
                    2,
                    3,
                    6,
                  ],
                "speciesIds": Array [
                    6,
                    7,
                  ],
                "vehiclesIds": Array [
                    14,
                    30,
                  ],
                "starshipsIds": Array [
                    12,
                    22,
                  ],
            },
        },
        }
      `,
      )
    })

    describe('when attempting to get specific vehicle', () => {
      describe(`when getting vehicle assigned to user's character`, () => {
        beforeEach(async () => {
          result = await request(app.getHttpServer())
            .get(
              getSingleVehiclePath(
                signUpResult.user.swapiCharacter.vehiclesIds[0],
              ),
            )
            .set('Authorization', `Bearer ${signUpResult.token.value}`)
        })

        it('returns 200 response with a proper error', () => {
          expect(result.status).toBe(200),
            expect(result.body).toMatchInlineSnapshot(`
              Object {
                "id": __ID__,
                "name": "Sand Crawler14",
                "model": "Digger Crawler",
              }
            `)
        })
      })

      describe(`when getting vehicle not assigned to user's character`, () => {
        beforeEach(async () => {
          result = await request(app.getHttpServer())
            .get(getSingleVehiclePath(2341))
            .set('Authorization', `Bearer ${signUpResult.token.value}`)
        })

        it('returns 403 response with a proper error', () => {
          expect(result.status).toBe(403)
          expect(result.body).toMatchInlineSnapshot(`
            Object {
              "timestamp": __TIMESTAMP__,
              "statusCode": 403,
              "path": "/vehicles/2341",
              "errorType": "Forbidden",
              "message": "Missing permissions.",
              "errorFields": Array [],
            }
          `)
        })
      })
    })

    describe(`when attempting to get user's all vehicles`, () => {
      beforeEach(async () => {
        result = await request(app.getHttpServer())
          .get(multipleVehiclesPath)
          .set('Authorization', `Bearer ${signUpResult.token.value}`)
      })

      it('retuns 200 response with data', () => {
        expect(result.status).toBe(200)
        expect(result.body).toMatchInlineSnapshot(`
          Array [
            Object {
              "id": __ID__,
              "name": "Sand Crawler14",
              "model": "Digger Crawler",
          },
            Object {
              "id": __ID__,
              "name": "Sand Crawler30",
              "model": "Digger Crawler",
          },
          ]
        `)
      })
    })
  })

  describe('when not authorized', () => {
    describe(`when attempting to get user's all vehicles`, () => {
      beforeEach(async () => {
        result = await request(app.getHttpServer()).get(multipleVehiclesPath)
      })

      it('retuns 401 response with a proper error', () => {
        expect(result.status).toBe(401)
        expect(result.body).toMatchInlineSnapshot(`
          Object {
            "timestamp": __TIMESTAMP__,
            "statusCode": 401,
            "path": "/vehicles",
            "errorType": "Unauthorized",
            "message": "Unauthorized",
            "errorFields": Array [],
          }
        `)
      })
    })

    describe('when attempting to get single specific vehicle', () => {
      beforeEach(async () => {
        result = await request(app.getHttpServer()).get(getSingleVehiclePath(1))
      })

      it('retuns 401 response with a proper error', () => {
        expect(result.status).toBe(401)
        expect(result.body).toMatchInlineSnapshot(`
          Object {
            "timestamp": __TIMESTAMP__,
            "statusCode": 401,
            "path": "/vehicles/1",
            "errorType": "Unauthorized",
            "message": "Unauthorized",
            "errorFields": Array [],
          }
        `)
      })
    })
  })
})
