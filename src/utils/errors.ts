export class NotFoundError extends Error {
  code: number = 404;
  constructor(message: string) {
    super(message);
  }
}
