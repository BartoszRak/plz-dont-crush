export { SwapiModule } from './swapi.module'
export { CharacterDto } from './dto/swapi-character.dto'
export { VehicleDto } from './dto/vehicle.dto'

export { CharactersManager } from './contract/characters-manager'
export { SpeciesManager } from './contract/species-manager'
export { VehiclesManager } from './contract/vehicles-manager'

export {
  SwapiCharacterId,
  SwapiCharacterFilmsIds,
  SwapiCharacterPlanetId,
  SwapiCharacterName,
  SwapiCharacterSpeciesIds,
  SwapiCharacterStarshipsIds,
  SwapiCharacterVehiclesIds,
} from './domain/character/swapi-character-values'
export { SwapiCharacter } from './domain/character/swapi-character'

export {
  SwapiSpeciesId,
  SwapiSpeciesName,
} from './domain/species/swapi-species-values'
export { SwapiSpecies } from './domain/species/swapi-species'

export {
  VehicleId,
  VehicleModel,
  VehicleName,
} from './domain/vehicle/vehicle-values'
export { Vehicle } from './domain/vehicle/vehicle'
