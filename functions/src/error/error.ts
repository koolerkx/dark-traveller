import { POINT_CAPTURE_COOLDOWN_SECONDS } from "../constant";

export abstract class ErrorWithMessageInfo extends Error {
  constructor(message: string) {
    super(message);
  }

  abstract messageInfo(): Record<string, string | number | undefined>;
}

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

export class CapturedPointInCooldownError extends ErrorWithMessageInfo {
  remainCooldownSeconds: number;
  cooldownSeconds: number;

  constructor(remainCooldownSeconds: number) {
    super(
      `Point was captured within the ${POINT_CAPTURE_COOLDOWN_SECONDS} seconds, remain ${remainCooldownSeconds} seconds`
    );
    this.remainCooldownSeconds = remainCooldownSeconds;
    this.cooldownSeconds = POINT_CAPTURE_COOLDOWN_SECONDS;

    this.name = "CapturedPointInCooldownError";

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ContextNotExistError);
    }
  }

  messageInfo() {
    return {
      remainCooldownSeconds: this.remainCooldownSeconds,
      cooldownSeconds: this.cooldownSeconds,
    };
  }
}
