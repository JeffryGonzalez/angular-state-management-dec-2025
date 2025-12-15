import { type OperatorFunction, filter } from 'rxjs';
// Stolen from https://github.com/timdeschryver/Sandbox/blob/main/Sandbox.AngularWorkspace/projects/sandbox-app/src/app/shared/operators/filter-nullish.operator.ts#L3

export function filterNullish<T>(): OperatorFunction<T | null | undefined, T> {
  return filter((value): value is T => value !== null && value !== undefined);
}
