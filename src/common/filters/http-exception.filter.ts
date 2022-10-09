import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter<T extends HttpException>
  implements ExceptionFilter
{
  catch(exception: T, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const response = context.getResponse<Response>();

    const status = exception.getStatus();
    const exceptionResponse = exception.getResponse();
    const errorName = exception.name;

    const error =
      typeof response === 'string'
        ? {
            message: exceptionResponse,
            statusCode: status,
            error: errorName,
          }
        : (exceptionResponse as object);

    return response.status(status).json({
      ok: false,
      date: new Date().toDateString(),
      ...error,
    });
  }
}
