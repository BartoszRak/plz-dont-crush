import { TinyTypeOf } from 'tiny-types'
import { SwapiSpeciesId } from './swapi-species-values';

export class SwapiCharacterId extends TinyTypeOf<number>() {}

export class SwapiCharacterName extends TinyTypeOf<string>() {}

export class SwapiCharacterSpeciesIds extends TinyTypeOf<SwapiSpeciesId[]>() {}

export class SwapiCharacterStarshipsIds extends TinyTypeOf<number[]>() {}

export class SwapiCharacterVehiclesIds extends TinyTypeOf<number[]>() {}

export class SwapiCharacterFilmsIds extends TinyTypeOf<number[]>() {}

export class SwapiCharacterPlanetId extends TinyTypeOf<number>() {}
