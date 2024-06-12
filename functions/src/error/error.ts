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

export class RequestParamsMissingError extends Error {
  constructor(params?: string[]) {
    super(`Params are missing in request${": " + params?.join(", ")}`);

    this.name = "RequestParamsMissingError";

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ContextNotExistError);
    }
  }
}
