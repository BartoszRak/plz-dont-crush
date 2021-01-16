import { Connection, getConnection, Repository } from 'typeorm'
import { Class } from 'utility-types'

import { isDefined } from '@main/utils'

type EntityClassType<T> = Class<T> | (() => T)

export type Repositories = Record<string, Repository<any>>

export class DatabaseHelper {
  private repositories?: Repositories
  private connection?: Connection

  initRepositoriesAndConnection(): void {
    const connection = getConnection()
    const repositories = connection.entityMetadatas
      .map(entityMetadata => {
        if (!entityMetadata.isJunction) {
          return connection.getRepository(entityMetadata.targetName)
        }
      })
      .filter(Boolean) as Repository<any>[]
    const repositoriesObject: Repositories = {}
    for (const repo of repositories) {
      repositoriesObject[repo.metadata.targetName] = repo
    }
    this.connection = connection
    this.repositories = repositoriesObject
  }

  getRepository<T>(entityClass: EntityClassType<T>): Repository<T> {
    if (!isDefined(this.repositories)) {
      throw new Error(
        'Cannot get repositories when repositories are undefined!',
      )
    }
    return this.repositories[entityClass.name] as Repository<T>
  }

  async cleanupRepositories(): Promise<void> {
    if (!isDefined(this.repositories)) {
      throw new Error(
        'Cannot cleanup repositories when repositories are undefined!',
      )
    }
    if (!isDefined(this.connection)) {
      throw new Error(
        'Cannot cleanup repositories when connection is undefined!',
      )
    }
    await this.connection.query(
      `TRUNCATE ${Object.values(this.repositories)
        .filter(repo => repo.metadata.tableType !== 'view')
        .map(repo => `"${repo.metadata.tableName}"`)
        .join(',')} CASCADE`,
    )
  }

  async cleanupConnection(): Promise<void> {
    if (!isDefined(this.connection)) {
      throw new Error('Cannot cleanup not existing connection!')
    }
    await this.connection.close()
  }
}
