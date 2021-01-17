import { Injectable } from '@nestjs/common'

import { SwapiCharacterId } from '@main/swapi'
import { SwapiCharacter } from './swapi-character'
import { SwapiCharacterName } from './swapi-character-values'

interface Input {
  id: number
  name: string
}

@Injectable()
export class SwapiCharacterFactory {
  create({ id, name }: Input): SwapiCharacter {
    return new SwapiCharacter(
      new SwapiCharacterId(id),
      new SwapiCharacterName(name),
    )
  }
}
