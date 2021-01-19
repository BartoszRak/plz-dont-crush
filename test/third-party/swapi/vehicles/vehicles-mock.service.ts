import { Vehicle } from "@main/swapi/ports/vehicle";
import { Injectable } from "@nestjs/common";

@Injectable()
export class VehiclesMockService {
  getVehicle(id: number, pilotId: number): Vehicle {
    return ({
      name: `Sand Crawler${id}`,
      model: 'Digger Crawler',
      manufacturer: 'Corellia Mining Corporation',
      cost_in_credits: '150000',
      length: '36.8 ',
      max_atmosphering_speed: '30',
      crew: '46',
      passengers: '30',
      cargo_capacity: '50000',
      consumables: '2 months',
      vehicle_class: 'wheeled',
      pilots: [`http://swapi.dev/api/vehicles/${pilotId}/`],
      films: [
        'http://swapi.dev/api/films/1/',
        'http://swapi.dev/api/films/5/'
      ],
      created: new Date( '2014-12-10T15:36:25.724000Z'),
      edited: new Date('2014-12-20T21:30:21.661000Z'),
      url: `http://swapi.dev/api/vehicles/${id}/`
    })
  }
}