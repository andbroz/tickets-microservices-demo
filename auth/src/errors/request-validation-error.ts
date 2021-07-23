import { ValidationError } from 'express-validator';

export class RequestValidationError extends Error {
  constructor(public errors: ValidationError[]) {
    super();

    // Set prototype due to extension of built in class
    Object.setPrototypeOf(this, RequestValidationError.prototype);
  }
}
