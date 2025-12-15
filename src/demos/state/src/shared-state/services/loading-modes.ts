import { computed } from '@angular/core';
import {
  patchState,
  signalStoreFeature,
  withComputed,
  withMethods,
  withState,
} from '@ngrx/signals';

type Modes =
  | 'idle'
  | 'loading'
  | 'backgroundFetching'
  | 'mutating'
  | { error: string };
type LoadingModeState = {
  requestStatus: Modes;
};
export function withLoadingModes() {
  return signalStoreFeature(
    withState<LoadingModeState>({
      requestStatus: 'idle',
    }),
    withComputed((state) => {
      return {
        isLoading: computed(() => state.requestStatus() === 'loading'),
        hasError: computed(() => {
          const status = state.requestStatus();
          return typeof status !== 'string' && 'error' in status;
        }),
      };
    }),
    withMethods((state) => {
      return {
        clearError: () => patchState(state, setIsIdle()),
      };
    }),
  );
}

export function setIsLoading(): LoadingModeState {
  return {
    requestStatus: 'loading',
  };
}
export function setIsIdle(): LoadingModeState {
  return {
    requestStatus: 'idle',
  };
}
export function setIsBackgroundFetching(): LoadingModeState {
  return {
    requestStatus: 'backgroundFetching',
  };
}
export function setIsMutating(): LoadingModeState {
  return {
    requestStatus: 'mutating',
  };
}
export function setError(error: string): LoadingModeState {
  return {
    requestStatus: { error },
  };
}

export function clearError(): LoadingModeState {
  return {
    requestStatus: 'idle',
  };
}
