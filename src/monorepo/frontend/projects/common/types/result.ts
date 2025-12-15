export type Failure<E = unknown> = {
  _type: 'Failure';
  error: E;
};

export type Success<T = void> = {
  _type: 'Success';
  value: T;
};

export type Results<T = void, E = unknown> = Success<T> | Failure<E>;

export function succeeded<T = void>(value: T): Success<T> {
  return {
    _type: 'Success',
    value: value,
  };
}

export function failed<E = unknown>(error: E): Failure<E> {
  return {
    _type: 'Failure',
    error,
  };
}

export function isSuccess<T, E = unknown>(
  result: Results<T, E>,
): result is Success<T> {
  return result._type === 'Success';
}

export function isFailure<T, E = unknown>(
  result: Results<T, E>,
): result is Failure<E> {
  return result._type === 'Failure';
}

/**
 *
 * @param result
 * @param fn a function that will be applied to the result if it is Success
 * @returns a Results<U> where the U is the result of applying the fn to the value of the Result<T>
 */
export function mapResult<T, U, E>(
  result: Results<T, E>,
  fn: (value: T) => U,
): Results<U, E> {
  if (isSuccess(result)) {
    return succeeded(fn(result.value));
  }
  else {
    return result;
  }
}

export function unwrapResult<T, E = unknown>(result: Results<T, E>): T {
  if (isFailure(result)) {
    throw new Error('Cannot unwrap Failure result');
  }
  return result.value;
}

export function unwrapResultOr<T>(result: Results<T>, defaultValue: T): T {
  return isSuccess(result) ? result.value : defaultValue;
}

export function resultCatch<T>(fn: () => T): Results<T, unknown> {
  try {
    return succeeded(fn());
  }
  catch (error) {
    return failed(error);
  }
}
