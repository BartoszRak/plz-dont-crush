import { Injectable } from '@nestjs/common'
import { SwapiCharacterId } from '../domain/swapi-character-values'
import { CharacterRepository } from '../ports/character-repository'
import { CharactersManager as CharactersManagerContract } from '../contract/characters-manager'
import { SwapiCharacter } from '../domain/swapi-character'
import { isDefined } from '@main/utils'
import { SwapiCharacterFactory } from '../domain/swapi-character.factory'

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
      ? this.swapiCharacterFactory.create({
          id: character.id,
          name: character.name,
        })
      : undefined
  }
}