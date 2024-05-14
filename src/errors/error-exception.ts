export class KeyExistsError extends Error {
  constructor(message: string) {
    super();
    this.message = message;
  }
}

export class KeyNotExistsError extends Error {
  constructor(message: string) {
    super();
    this.message = message;
  }
}
