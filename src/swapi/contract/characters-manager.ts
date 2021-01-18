import { SwapiCharacter } from '../domain/character/swapi-character'
import { SwapiCharacterId } from '../domain/character/swapi-character-values'

export abstract class CharactersManager {
  abstract getRandomCharacterId(): Promise<SwapiCharacterId>
  abstract getCharacterById(id: SwapiCharacterId): Promise<SwapiCharacter | undefined>
}
