import { TEither, left, right } from "../Either";
import { ExtractValueError } from "../Helpers/Errors/Maybe.error";

enum MaybeType {
  Just = "just",
  Nothing = "nothing"
}

export interface IJust<T> {
  tag: MaybeType.Just;
  value: T;
}

export interface INothing {
  tag: MaybeType.Nothing;
}

export interface IMaybe<T> {
  just: IJust<T>;
  nothing: INothing
}

export class Maybe<T> {
  constructor() { };

  static just<T>(value: T) {
    return new Just(value);
  }

  static nothing() {
    return new Nothing();
  }

  static fromNullable<T>(value: T) {
    return !!value;
  }

  static of<T>(value: T) {
    return Maybe.fromNullable(value)
      ? Maybe.just(value)
      : Maybe.nothing();
  }
}


export class Just<T> extends Maybe<T> {
  public tag: MaybeType;

  constructor(private readonly value: T) {
    super();
    this.tag = MaybeType.Just;
  }

  public isJust() {
    return true;
  }

  public get(): TEither<null, T> {
    return right(this.value);
  }

  public map(fn: (...args: any[]) => any) {
    return Just.of(fn(this.value));
  }

  public static of<T>(value: T) {
    return new Just(value);
  }

  public toString() {
    return `Maybe.Just(${this.value})`;
  }
}


export class Nothing<T> extends Maybe<T> {
  public tag: MaybeType;
  constructor() {
    super();
    this.tag = MaybeType.Nothing;
  }

  public isNothing() {
    return true;
  }

  public get(): TEither<Error, null> {
    return left(new ExtractValueError("Can't extract the value of a Nothing."));
  }

  public map(fn: (...args: any[]) => any) {
    return this;
  }

  public toString() {
    return `Maybe.Nothing`;
  }
}




