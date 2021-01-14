import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm'

import { StandardEntity } from '@main/standard.entity'
import { UserEntity } from '@main/user/user.entity'

@Entity('tokens')
export class TokenEntity extends StandardEntity {
  @Column()
  value!: string

  @ManyToOne(
    () => UserEntity,
    user => user.tokens,
    {
      cascade: true,
      onDelete: 'CASCADE',
    },
  )
  @JoinColumn({
    name: 'userId',
  })
  user?: UserEntity

  @Column()
  userId!: string
}
