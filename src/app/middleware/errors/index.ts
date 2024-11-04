// src/errors/index.ts
class GeneralError extends Error {
  constructor(message: string) {
    super(message);
    this.name = this.constructor.name;
  }

  getCode(): number {
    if (this instanceof BadRequest) {
      return 400;
    }
    // if (this instanceof NotFound) {
    //   return 404;
    // }
    if (this instanceof Unauthorized) {
      return 401;
    }
    if (this instanceof ApplicationError) {
      return 400;
    }
    if (this instanceof InsufficientAccessError) {
      return 403;
    }
    return 400;
  }
}

class BadRequest extends GeneralError {}
// class NotFound extends GeneralError {}
class Unauthorized extends GeneralError {}
class ApplicationError extends GeneralError {}
class InsufficientAccessError extends GeneralError {}

export {
  GeneralError,
  BadRequest,
  // NotFound,
  Unauthorized,
  ApplicationError,
  InsufficientAccessError,
};
