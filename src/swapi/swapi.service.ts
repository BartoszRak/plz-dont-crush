import { Injectable } from "@nestjs/common";
import { SwapiRepository } from "./ports";

@Injectable()
export class SwapiService {
  constructor(private readonly swapiRepository: SwapiRepository) {}

  async getRandomCharacterId(): Promise<number> {
    const character = await this.swapiRepository.getRandomCharacter()
    return character.id
  }
}