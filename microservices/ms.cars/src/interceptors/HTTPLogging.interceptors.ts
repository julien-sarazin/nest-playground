import { Injectable, NestInterceptor, ExecutionContext} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable()
export class HTTPLoggingInterceptor implements NestInterceptor {

  intercept(context: ExecutionContext, call$: Observable<any>): Observable<any> {
    const now = Date.now();
    const request = context.switchToHttp().getRequest();

    const method = request.method;
    const url = request.originalUrl;

    return call$.pipe(
      tap(() => {
        const response = context.switchToHttp().getResponse();
        const delay = Date.now() - now;
        console.log(`${response.statusCode} | [${method}] ${url} - ${delay}ms`);
      }),
      catchError((error) => {
        const response = context.switchToHttp().getResponse();
        const delay = Date.now() - now;
        console.error(`${response.statusCode} | [${method}] ${url} - ${delay}ms`);
        return throwError(error);
      }),
    );
  }
}
