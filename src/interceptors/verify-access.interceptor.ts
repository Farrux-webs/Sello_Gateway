import  {
  type CallHandler,
  type ExecutionContext,
  type NestInterceptor,
  BadRequestException,
} from '@nestjs/common';
import crypto from 'crypto';
import { Observable } from 'rxjs';

export class VerifyAccessInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> {
    const request = context.switchToHttp().getRequest();

    const accessToken = request.headers['authorization']?.replace(
      'Bearer ',
      '',
    );
    
    if(!accessToken){
      throw new BadRequestException('Provide Access Token')
    }



    request.body.userId = accessToken

    return next.handle();
  }
}
