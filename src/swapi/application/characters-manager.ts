import { Injectable } from '@nestjs/common'

import { isDefined } from '@main/utils'

import { SwapiCharacterId } from '../domain/character/swapi-character-values'
import { CharacterRepository } from '../ports/character-repository'
import { CharactersManager as CharactersManagerContract } from '../contract/characters-manager'
import { SwapiCharacter } from '../domain/character/swapi-character'
import { SwapiCharacterFactory } from '../domain/character/swapi-character.factory'

@Injectable()
export class CharactersManager implements CharactersManagerContract {
  constructor(
    private readonly swapiRepository: CharacterRepository,
    private readonly swapiCharacterFactory: SwapiCharacterFactory,
  ) {}

  async getRandomCharacterId(): Promise<SwapiCharacterId> {
    const character = await this.swapiRepository.getRandomCharacter()
    return new SwapiCharacterId(character.id)
  }

  async getCharacterById(
    id: SwapiCharacterId,
  ): Promise<SwapiCharacter | undefined> {
    const character = await this.swapiRepository.getCharacter(id.value)
    return isDefined(character)
      ? this.swapiCharacterFactory.create(character)
      : undefined
  }
}
