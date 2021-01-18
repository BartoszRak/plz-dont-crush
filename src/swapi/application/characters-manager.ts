import { Injectable } from '@nestjs/common'

import { isDefined } from '@main/utils'

import { CharacterId } from '../domain/character/character-values'
import { CharacterRepositoryPort } from '../ports/character-repository.port'
import { CharactersManager as CharactersManagerContract } from '../contract/characters-manager'
import { Character } from '../domain/character/character'
import { CharacterFactory } from '../domain/character/character.factory'

@Injectable()
export class CharactersManager implements CharactersManagerContract {
  constructor(
    private readonly swapiRepository: CharacterRepositoryPort,
    private readonly swapiCharacterFactory: CharacterFactory,
  ) {}

  async getRandomCharacterId(): Promise<CharacterId> {
    const character = await this.swapiRepository.getRandomCharacter()
    return new CharacterId(character.id)
  }

  async getCharacterById(
    id: CharacterId,
  ): Promise<Character | undefined> {
    const character = await this.swapiRepository.getCharacter(id.value)
    return isDefined(character)
      ? this.swapiCharacterFactory.create(character)
      : undefined
  }
}
