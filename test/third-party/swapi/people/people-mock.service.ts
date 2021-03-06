import { Character } from '@main/swapi/ports/character'
import { Injectable } from '@nestjs/common'

@Injectable()
export class PeopleMockService {
  getCharacter(id: number): Character {
    return {
      name: 'Luke Skywalker',
      height: '172',
      mass: '77',
      hair_color: 'blond',
      skin_color: 'fair',
      eye_color: 'blue',
      birth_year: '19BBY',
      gender: 'male',
      homeworld: 'http://swapi.dev/api/planets/1/',
      films: [
        'http://swapi.dev/api/films/1/',
        'http://swapi.dev/api/films/2/',
        'http://swapi.dev/api/films/3/',
        'http://swapi.dev/api/films/6/',
      ],
      species: ['http://swapi.dev/api/films/6/','http://swapi.dev/api/films/7/',],
      vehicles: [
        'http://swapi.dev/api/vehicles/14/',
        'http://swapi.dev/api/vehicles/30/',
      ],
      starships: [
        'http://swapi.dev/api/starships/12/',
        'http://swapi.dev/api/starships/22/',
      ],
      created: new Date('2014-12-09T13:50:51.644000Z'),
      edited: new Date('2014-12-20T21:17:56.891000Z'),
      url: `http://swapi.dev/api/people/${id}/`,
    }
  }
}
