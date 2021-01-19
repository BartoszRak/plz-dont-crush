import { Species } from "@main/swapi/ports/species";
import { Injectable } from "@nestjs/common";

@Injectable()
export class SpeciesMockService {
  getSpecies(id: number, characterId: number): Species {
    return {
      name: `Human${id}`,
      classification: 'mammal',
      designation: 'sentient',
      average_height: '180',
      skin_colors: 'caucasian, black, asian, hispanic',
      hair_colors: 'blonde, brown, black, red',
      eye_colors: 'brown, blue, green, hazel, grey, amber',
      average_lifespan: '120',
      homeworld: 'http://swapi.dev/api/planets/9/',
      language: 'Galactic Basic',
      people: [
        `http://swapi.dev/api/people/${characterId}/`,
      ],
      films: [
        'http://swapi.dev/api/films/1/',
        'http://swapi.dev/api/films/2/',
        'http://swapi.dev/api/films/3/',
        'http://swapi.dev/api/films/4/',
        'http://swapi.dev/api/films/5/',
        'http://swapi.dev/api/films/6/'
      ],
      created: new Date('2014-12-10T13:52:11.567000Z'),
      edited: new Date('2014-12-20T21:36:42.136000Z'),
      url: `http://swapi.dev/api/species/${id}/`
    }
  }
}