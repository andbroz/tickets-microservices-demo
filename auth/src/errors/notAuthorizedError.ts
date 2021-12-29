import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import { CustomError } from './custom-error';

export class NotAuthorizedError extends CustomError {
  statusCode = StatusCodes.UNAUTHORIZED;

  constructor() {
    super(ReasonPhrases.UNAUTHORIZED);
    Object.setPrototypeOf(this, NotAuthorizedError.prototype);
  }

  serializeErrors(): { message: string; field?: string | undefined }[] {
    return [{ message: ReasonPhrases.UNAUTHORIZED }];
  }
}
