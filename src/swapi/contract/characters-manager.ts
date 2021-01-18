import { Character } from '../domain/character/character'
import { CharacterId } from '../domain/character/character-values'

export abstract class CharactersManager {
  abstract getRandomCharacterId(): Promise<CharacterId>
  abstract getCharacterById(id: CharacterId): Promise<Character | undefined>
}
