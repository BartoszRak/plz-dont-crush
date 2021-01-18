export { SwapiModule } from './swapi.module'
export { CharacterDto } from './dto/swapi-character.dto'
export { VehicleDto } from './dto/vehicle.dto'

export { CharactersManager } from './contract/characters-manager'
export { SpeciesManager } from './contract/species-manager'
export { VehiclesManager } from './contract/vehicles-manager'

export {
  CharacterId,
  CharacterFilmsIds,
  CharacterPlanetId,
  CharacterName,
  CharacterSpeciesIds,
  CharacterStarshipsIds,
  CharacterVehiclesIds,
} from './domain/character/character-values'
export { Character } from './domain/character/character'

export {
  SpeciesId,
  SpeciesName,
} from './domain/species/species-values'
export { Species } from './domain/species/species'

export {
  VehicleId,
  VehicleModel,
  VehicleName,
} from './domain/vehicle/vehicle-values'
export { Vehicle } from './domain/vehicle/vehicle'
