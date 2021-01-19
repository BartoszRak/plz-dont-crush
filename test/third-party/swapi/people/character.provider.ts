import { Character } from "@main/swapi/ports/character"
import { Provider } from "@nestjs/common"
import { PeopleMockService } from "./people-mock.service"

export const CHARACTER_TOKEN = 'CHARACTER_ID_TOKEN'

export const CharacterProvider: Provider<Character> = {
  provide: CHARACTER_TOKEN,
  useFactory: (peopleMockService: PeopleMockService) => peopleMockService.getCharacter(1),
  inject: [PeopleMockService]
}