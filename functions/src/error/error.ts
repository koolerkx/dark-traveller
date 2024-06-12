export class ContextNotExistError extends Error {
  constructor() {
    super(`DB Context not exist in request`);

    this.name = "ContextNotExtstError";

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ContextNotExistError);
    }
  }
}

export class ConnectorNotExistError extends Error {
  constructor() {
    super(`Connector not exist in request`);

    this.name = "ConnectorNotExistError";

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ContextNotExistError);
    }
  }
}
