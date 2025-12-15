import { appErrorEvents } from './events';
import { computed } from '@angular/core';
import { signalStore, withComputed } from '@ngrx/signals';
import { Events, on, withEffects, withReducer } from '@ngrx/signals/events';
import { addEntity, updateEntity, withEntities } from '@ngrx/signals/entities';
import { inject } from '@angular/core';
import { tap } from 'rxjs';
type AppErrorEntity = {
  id: string;
  message: string;
  handled: boolean;
  reportedAt?: number;
  feature: string;
  originalError?: unknown;
};

export const errorsStore = signalStore(
  withEntities<AppErrorEntity>(),
  withReducer(
    on(appErrorEvents.setError, ({ payload }) => {
      const errorEntity: AppErrorEntity = {
        id: crypto.randomUUID(),
        message: payload.error,
        handled: false,
        feature: payload.feature,
        reportedAt: Date.now(),
      };
      return addEntity(errorEntity);
    }),
    on(appErrorEvents.clearError, ({ payload }) =>
      updateEntity({ id: payload, changes: { handled: true } }),
    ),
  ),
  withComputed((state) => ({
    hasError: computed(() => state.ids().length),
    hasUnhandledErrors: computed(() => state.entities().some((err) => !err.handled)),
    unhandledErrors: computed(() => state.entities().filter((err) => !err.handled)),
    handledErrors: computed(() => state.entities().filter((err) => err.handled)),
  })),
  withEffects((_, events = inject(Events)) => ({
    $handleReportingErrors: events.on(appErrorEvents.setError).pipe(
      // Simulate reporting error to external service
      // In real app, replace with actual HTTP call
      tap(({ payload }) => {
        console.group('Error Reporting');
        console.error(`Reporting error from feature "${payload.feature}": ${payload.error}`);
        console.dir(payload.originalError);
        console.groupEnd();
      }),
    ),
  })),
);
