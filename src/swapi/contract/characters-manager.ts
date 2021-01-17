import { SwapiCharacter } from '../domain/swapi-character'
import { SwapiCharacterId } from '../domain/swapi-character-values'

export abstract class CharactersManager {
  abstract getRandomCharacterId(): Promise<SwapiCharacterId>
  abstract getCharacterById(id: SwapiCharacterId): Promise<SwapiCharacter | undefined>
}
