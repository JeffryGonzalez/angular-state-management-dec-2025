// Inspired by Rust's Option type, this module provides a way to handle optional values in TypeScript.
// and https://www.youtube.com/watch?v=DYtDeasFQkU&t=25s

export type None = { readonly _type: 'None' };
export type Some<T> = { readonly _type: 'Some'; value: T };
export type Option<T> = None | Some<T>;

// constant for a None value.
export const none: None = { _type: 'None' };
// function to create a Some value.
export const some = <T>(value: T): Some<T> => ({ _type: 'Some', value });

/**
 * Type guard functions to check if an Option is None.
 * @param option - The Option to check
 * @returns true if the option is None, false otherwise
 */
export function isNone<T>(option: Option<T>): option is None {
  return option._type === 'None';
}
/**
 * Type guard functions to check if an Option is Some
 * @param option - The Option to check
 * @returns true if the option is Some, false otherwise
 */
export function isSome<T>(option: Option<T>): option is Some<T> {
  return option._type === 'Some';
}

/**
 * a function that maps a function over an Option.
 * If the Option is None, it returns None.
 * If the Option is Some, it applies the function to the value and returns a new Some
 * @param option
 * @param fn a function that will be applied to the value if it is Some
 * @returns an Option<U> where U is the result of applying fn to the value of the Option<T>
 */
export function mapOption<T, U>(
  option: Option<T>,
  fn: (value: T) => U,
): Option<U> {
  if (isNone(option)) {
    return none;
  }
  else {
    return some(fn(option.value));
  }
}

/**
 * Throw an error if the Option is None, otherwise return the value.
 * @param opt
 * @throws Error if the Option is None
 * @returns the value of the Option if it is Some
 */
export function unwrapOption<T>(opt: Option<T>): T {
  if (isNone(opt)) {
    throw new Error('Cannot unwrap None');
  }
  return opt.value;
}

/**
 * If the option is none, return the default value.
 * If the option is some, return the value.
 * @param opt
 * @param defaultValue
 * @returns
 */
export function unwrapOptionOr<T>(opt: Option<T>, defaultValue: T): T {
  return isSome(opt) ? opt.value : defaultValue;
}

/**
 * A function that executes a function and returns an Option.
 * If the function throws an error, it returns None.
 * If the function returns a value, it returns Some(value).
 * @param fn a function that will be executed
 * @returns an Option<T> where T is the return type of the function
 */
export function optionalCatch<T>(fn: () => T): Option<T> {
  try {
    return some(fn());
  }
  catch {
    return none;
  }
}
