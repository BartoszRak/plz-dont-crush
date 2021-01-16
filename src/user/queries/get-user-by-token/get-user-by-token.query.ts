import { TokenValue } from "@main/token";
import { User } from "@main/user/domain/user";
import { Query } from "@main/utils";

export class GetUserByToken extends Query<User | undefined> {
  constructor(readonly tokenValue: TokenValue) {
    super()
  }
}