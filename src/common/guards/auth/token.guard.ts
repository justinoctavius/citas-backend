import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { TokenService } from 'src/common/services/token/token.service';
import { UserService } from 'src/users/services/users.service';

@Injectable()
export class TokenGuard implements CanActivate {
  constructor(
    private readonly tokenService: TokenService,
    private readonly userService: UserService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers['authorization']?.split(' ')[1];

    if (!token) {
      return false;
    }

    try {
      const decoded = await this.tokenService.verify(token);

      if (!decoded) {
        return false;
      }

      request.user = await this.userService.findOne(decoded?.id);
      return true;
    } catch (error) {
      return false;
    }
  }
}
