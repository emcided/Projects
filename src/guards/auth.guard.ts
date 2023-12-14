import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private usersService: UsersService) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const apiKey = request.headers['authorization'];

    if (!apiKey) throw new UnauthorizedException();

    const user = await this.usersService.getUserByApiKey(apiKey);

    if (!user) throw new UnauthorizedException();

    request.user = user;

    return true;
  }
}
