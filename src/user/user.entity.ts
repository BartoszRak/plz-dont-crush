import { Column, Entity, OneToMany } from 'typeorm'

import { StandardEntity } from '@main/standard.entity'
import { TokenEntity } from '@main/token/token.entity'

@Entity('users')
export class UserEntity extends StandardEntity {
  @Column()
  email!: string

  @Column()
  passwordHash!: string

  @OneToMany(
    () => TokenEntity,
    token => token.user,
  )
  tokens?: TokenEntity[]
}
