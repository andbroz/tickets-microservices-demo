import { CustomError } from './custom-error';

// Only as example how to do it
export class DatabaseConnectionError extends CustomError {
  reason = 'Failed to connect to database';
  statusCode = 500;
  constructor() {
    super('Failed to connect to database');

    Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
  }

  serializeErrors() {
    return [
      {
        message: this.reason,
        statusCode: this.statusCode,
      },
    ];
  }
}
