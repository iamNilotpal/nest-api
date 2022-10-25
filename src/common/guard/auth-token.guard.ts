import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { IS_PUBLIC_KEY } from '../decorators/public.decorator';

@Injectable()
export class AuthTokenGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const isPublic = this.reflector.get(IS_PUBLIC_KEY, context.getHandler());
    if (isPublic) return true;

    const ctx = context.switchToHttp();
    const request = ctx.getRequest<Request>();
    const bearer = request.headers.authorization;

    if (bearer) {
      const token = bearer?.split('Bearer')[1].trim();
      return token === 'some token that is super secret';
    }
    return false;
  }
}
