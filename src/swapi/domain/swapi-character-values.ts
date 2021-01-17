import { TinyTypeOf } from 'tiny-types'

export class SwapiCharacterId extends TinyTypeOf<number>() {}

export class SwapiCharacterName extends TinyTypeOf<string>() {}

export class SwapiCharacterSpeciesIds extends TinyTypeOf<number[]>() {}

export class SwapiCharacterStarshipsIds extends TinyTypeOf<number[]>() {}

export class SwapiCharacterVehiclesIds extends TinyTypeOf<number[]>() {}

export class SwapiCharacterFilmsIds extends TinyTypeOf<number[]>() {}

export class SwapiCharacterPlanetId extends TinyTypeOf<number>() {}
