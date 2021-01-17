import { Character, CharacterWithIds } from "./character";
import { WithIds } from "./with-ids.type";

export abstract class CharacterRepository {
  abstract getRandomCharacter(): Promise<WithIds<CharacterWithIds>>

  abstract getCharacter(id: number): Promise<WithIds<CharacterWithIds> | undefined>
}