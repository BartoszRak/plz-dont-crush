import { TinyTypeOf } from 'tiny-types'
import { SpeciesId } from '../species/species-values';
import { VehicleId } from '../vehicle/vehicle-values';

export class CharacterId extends TinyTypeOf<number>() {}

export class CharacterName extends TinyTypeOf<string>() {}

export class CharacterSpeciesIds extends TinyTypeOf<SpeciesId[]>() {}

export class CharacterStarshipsIds extends TinyTypeOf<number[]>() {}

export class CharacterVehiclesIds extends TinyTypeOf<VehicleId[]>() {}

export class CharacterFilmsIds extends TinyTypeOf<number[]>() {}

export class CharacterPlanetId extends TinyTypeOf<number>() {}
