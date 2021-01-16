import { Character } from "./character";
import { WithId } from "./with-id.type";

export abstract class SwapiRepository {
  abstract getRandomCharacter(): Promise<WithId<Character>>

  abstract getCharacter(id: number): Promise<WithId<Character> | undefined>
}