import { CharacterWithIds } from "./character";

export abstract class CharacterRepository {
  abstract getRandomCharacter(): Promise<CharacterWithIds>

  abstract getCharacter(id: number): Promise<CharacterWithIds | undefined>
}