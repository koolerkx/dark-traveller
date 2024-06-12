export class ContextNotExistError extends Error {
  constructor() {
    super(`Error occurred, DB not exist in context`);

    this.name = "ContextNotExtstError";

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ContextNotExistError);
    }
  }
}
