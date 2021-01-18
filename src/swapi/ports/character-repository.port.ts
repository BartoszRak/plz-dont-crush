import { CharacterWithIds } from "./character";

export abstract class CharacterRepositoryPort {
  abstract getRandomCharacter(): Promise<CharacterWithIds>

  abstract getCharacter(id: number): Promise<CharacterWithIds | undefined>
}