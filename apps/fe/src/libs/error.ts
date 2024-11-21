export class CustomError extends Error {
  readonly message: string;
  readonly statusCode: string;
  readonly error: string;

  constructor({
    message,
    statusCode,
    error,
  }: {
    message: string;
    statusCode: string;
    error: string;
  }) {
    super();

    // Error
    this.name = error || "CustomError";

    // CustomError
    this.message = message;
    this.statusCode = statusCode;
    this.error = error;
  }
}
