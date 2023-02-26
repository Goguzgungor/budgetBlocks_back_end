/* istanbul ignore next */
import { HttpException } from "@nestjs/common";

export enum HttpErrorFormat {
  'E400' = 'BAD_REQUEST',
  'E401' = 'UNAUTHORIZED',
  'E403' = 'FORBIDDEN',
  'E404' = 'NOT_FOUND',
  'E422' = 'VALIDATION_ERROR',
  'E409' = 'CONFLICT_ERROR',
  'E500' = 'GENERAL_ERROR',
}

export class ErrorException extends HttpException {
    constructor(error_code: string, message: string, statusCode: number = 400) {
      super({
          error_code,
          message
      }, statusCode);
    }
}

export class HttpError extends HttpException {
  constructor(message: string, statusCode: number = 400) {
    const errorCode = HttpErrorFormat['E' + statusCode];
    super(
      {
        error_code: errorCode,
        message,
      },
      statusCode,
    );
  }
}
