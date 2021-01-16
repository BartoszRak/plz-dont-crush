import { Injectable } from "@nestjs/common";
import { SwapiCharacterId } from "./domain/swapi-character.id";
import { SwapiRepository } from "./ports";

@Injectable()
export class SwapiService {
  constructor(private readonly swapiRepository: SwapiRepository) {}

  async getRandomCharacterId(): Promise<SwapiCharacterId> {
    const character = await this.swapiRepository.getRandomCharacter()
    return new SwapiCharacterId(character.id)
  }
}