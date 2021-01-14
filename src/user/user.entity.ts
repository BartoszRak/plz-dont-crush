import { Column, Entity } from 'typeorm'

import { StandardEntity } from '@main/standard.entity'

@Entity('users')
export class UserEntity extends StandardEntity {
  @Column()
  email!: string

  @Column()
  passwordHash!: string
}
