import { ExceptionFilter, Catch, ArgumentsHost, BadRequestException } from '@nestjs/common';
import { Response } from 'express';

@Catch(BadRequestException)
export class ValidationExceptionFilter implements ExceptionFilter {
  catch(exception: BadRequestException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    const exceptionResponse = exception.getResponse() as any;

    let errorMessages: string[] = [];

    if (Array.isArray(exceptionResponse.message)) {
      errorMessages = exceptionResponse.message.map(String);
    } else if (typeof exceptionResponse.message === 'object') {
      errorMessages = Object.values(exceptionResponse.message)
        .flat()
        .map(String);
    } else if (exceptionResponse.message) {
      errorMessages = [String(exceptionResponse.message)];
    }

    response
      .status(status)
      .json({
          error: errorMessages,
          message: 'Validation failed',
          statusCode: status,
      });
  }
}