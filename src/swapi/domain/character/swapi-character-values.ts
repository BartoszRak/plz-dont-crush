import { TinyTypeOf } from 'tiny-types'
import { SwapiSpeciesId } from '../species/swapi-species-values';
import { VehicleId } from '../vehicle/vehicle-values';

export class SwapiCharacterId extends TinyTypeOf<number>() {}

export class SwapiCharacterName extends TinyTypeOf<string>() {}

export class SwapiCharacterSpeciesIds extends TinyTypeOf<SwapiSpeciesId[]>() {}

export class SwapiCharacterStarshipsIds extends TinyTypeOf<number[]>() {}

export class SwapiCharacterVehiclesIds extends TinyTypeOf<VehicleId[]>() {}

export class SwapiCharacterFilmsIds extends TinyTypeOf<number[]>() {}

export class SwapiCharacterPlanetId extends TinyTypeOf<number>() {}
