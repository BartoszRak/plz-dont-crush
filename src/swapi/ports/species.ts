import { WithIds } from "./with-ids.type";

export interface Species {
  name: string
  classification: string
  designation: string
  average_height: string
  skin_colors: string
  hair_colors: string
  eye_colors: string
  average_lifespan: string
  homeworld: string
  language: string
  people: string[]
  films: string[]
  created: Date
  edited: Date
  url: string
}

export type SpeciesWithIds = WithIds<Species, 'planetId', 'charactersIds' | 'filmsIds'>
