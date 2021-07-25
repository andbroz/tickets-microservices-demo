// Only as example how to do it
export class DatabaseConnectionError extends Error {
  reason = 'Failed to connect to database';
  statusCode = 500;
  constructor() {
    super();

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
