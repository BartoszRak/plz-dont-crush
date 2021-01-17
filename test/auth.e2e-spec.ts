import { SignUpDto } from '@main/auth/dto/sign-up.dto'
import { INestApplication } from '@nestjs/common'
import * as request from 'supertest'
import { init } from './utils/init'

const signUpPath = '/auth/sign-up'
const signInPath = '/auth/sign-in'
const protectedHealthPath = '/protected-health'

describe('Auth (e2e)', () => {
  let app: INestApplication
  let result: request.Response

  init(({ application, done }) => {
    app = application
    done()
  })

  describe('when attempting to access protected endpoint without authorization', () => {
    beforeEach(async () => {
      result = await request(app.getHttpServer()).get(protectedHealthPath)
    })

    it('returns 401 error response', () => {
      expect(result.status).toBe(401)
      expect(result.body).toMatchInlineSnapshot(`
        Object {
          "timestamp": __TIMESTAMP__,
          "statusCode": 401,
          "path": "/protected-health",
          "errorType": "Unauthorized",
          "message": "Unauthorized",
          "errorFields": Array [],
        }
      `)
    })
  })

  describe('when signing up', () => {
    describe('when passing valid data', () => {
      const mockedSignUpData: SignUpDto = {
        email: 'mocked@email.com',
        password: '123abcABC',
      }

      let receivedToken: string

      beforeEach(async () => {
        result = await request(app.getHttpServer())
          .post(signUpPath)
          .send(mockedSignUpData)
        receivedToken = result.body.token.value
      })

      it('returns 201 response with user data and token', () => {
        expect(result.status).toBe(201)
        expect(result.body).toMatchInlineSnapshot(
          {
            token: {
              value: expect.any(String),
            },
            user: {
              swapiCharacter: {
                id: expect.any(Number),
                name: expect.any(String),
                planetId: expect.any(Number),
                filmsIds: expect.any(Array),
                speciesIds: expect.any(Array),
                vehiclesIds: expect.any(Array),
                starshipsIds: expect.any(Array),
              },
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
                  "name": Any<String>,
                  "planetId": Any<Number>,
                  "filmsIds": Any<Array>,
                  "speciesIds": Any<Array>,
                  "vehiclesIds": Any<Array>,
                  "starshipsIds": Any<Array>,
              },
          },
          }
        `,
        )
      })

      describe('when accessing protected endpoint with received token', () => {
        beforeEach(async () => {
          result = await request(app.getHttpServer())
            .get(protectedHealthPath)
            .set('Authorization', `Bearer ${receivedToken}`)
        })

        it('returns 200 response with payload', () => {
          expect(result.status).toBe(200)
          expect(result.text).toMatchInlineSnapshot(`"Protected and healthy!"`)
        })
      })

      describe('when attempting to sign in', () => {
        describe('when using data that have been used to sign up', () => {
          beforeEach(async () => {
            result = await request(app.getHttpServer())
              .post(signInPath)
              .send(mockedSignUpData)
            receivedToken = result.body.token.value
          })

          it('signs user in and returns 201 response with his data and token', () => {
            expect(result.status).toBe(201)
            expect(result.body).toMatchInlineSnapshot(
              {
                token: {
                  value: expect.any(String),
                },
                user: {
                  swapiCharacter: {
                    id: expect.any(Number),
                    name: expect.any(String),
                    planetId: expect.any(Number),
                    filmsIds: expect.any(Array),
                    speciesIds: expect.any(Array),
                    vehiclesIds: expect.any(Array),
                    starshipsIds: expect.any(Array),
                  },
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
                      "name": Any<String>,
                      "planetId": Any<Number>,
                      "filmsIds": Any<Array>,
                      "speciesIds": Any<Array>,
                      "vehiclesIds": Any<Array>,
                      "starshipsIds": Any<Array>,
                  },
              },
              }
            `,
            )
          })

          describe('when accessing protected endpoint with received token', () => {
            beforeEach(async () => {
              result = await request(app.getHttpServer())
                .get(protectedHealthPath)
                .set('Authorization', `Bearer ${receivedToken}`)
            })

            it('returns 200 response with payload', () => {
              expect(result.status).toBe(200)
              expect(result.text).toMatchInlineSnapshot(
                `"Protected and healthy!"`,
              )
            })
          })
        })

        describe('when using invalid data', () => {
          describe('when passing an email of not existing account', () => {
            beforeEach(async () => {
              result = await request(app.getHttpServer())
                .post(signInPath)
                .send({
                  email: 'not-existing-account@email.com',
                  password: mockedSignUpData.password,
                })
            })

            it('returns 400 response with a proper error', () => {
              expect(result.status).toBe(400)
              expect(result.body).toMatchInlineSnapshot(`
                Object {
                  "timestamp": __TIMESTAMP__,
                  "statusCode": 400,
                  "path": "/auth/sign-in",
                  "errorType": "Bad Request",
                  "message": "Invalid email or password.",
                  "errorFields": Array [],
                }
              `)
            })
          })

          describe('when passing an invalid password', () => {
            beforeEach(async () => {
              result = await request(app.getHttpServer())
                .post(signInPath)
                .send({
                  email: mockedSignUpData.email,
                  password: 'anInvalidPassword',
                })
            })

            it('returns 400 response with a proper error', () => {
              expect(result.status).toBe(400)
              expect(result.body).toMatchInlineSnapshot(`
                Object {
                  "timestamp": __TIMESTAMP__,
                  "statusCode": 400,
                  "path": "/auth/sign-in",
                  "errorType": "Bad Request",
                  "message": "Invalid email or password.",
                  "errorFields": Array [],
                }
              `)
            })
          })
        })
      })

      describe('when attempting to sign up again with the same data', () => {
        beforeEach(async () => {
          result = await request(app.getHttpServer())
            .post(signUpPath)
            .send(mockedSignUpData)
        })

        it('returns 409 response with proper error', () => {
          expect(result.status).toBe(409)
          expect(result.body).toMatchInlineSnapshot(`
            Object {
              "timestamp": __TIMESTAMP__,
              "statusCode": 409,
              "path": "/auth/sign-up",
              "errorType": "Conflict",
              "message": "User with this email already exists.",
              "errorFields": Array [],
            }
          `)
        })
      })
    })

    describe('when passing invalid data', () => {
      beforeEach(async () => {
        result = await request(app.getHttpServer())
          .post(signUpPath)
          .send({
            name: 'James',
          })
      })

      it('returns 400 response with proper errors', () => {
        expect(result.status).toBe(400)
        expect(result.body).toMatchInlineSnapshot(`
          Object {
            "timestamp": __TIMESTAMP__,
            "statusCode": 400,
            "path": "/auth/sign-up",
            "errorType": "Bad Request",
            "message": "Bad Request Exception",
            "errorFields": Array [
              "email must be an email",
              "password must be shorter than or equal to 100 characters",
              "password must be longer than or equal to 6 characters",
              "password must be a string",
            ],
          }
        `)
      })
    })
  })
})
