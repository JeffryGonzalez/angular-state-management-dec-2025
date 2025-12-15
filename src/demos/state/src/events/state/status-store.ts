import { signalStore, withState } from '@ngrx/signals';
import { on, withReducer } from '@ngrx/signals/events';
import { counterPageEvents } from './counter/counter-events';
import { todoListApiEvents } from './todos/todo-list-events';

export const StatusStore = signalStore(
  withState({
    message: '',
  }),
  withReducer(
    on(counterPageEvents.setBy, ({ payload }) => ({
      message: `Changed Counting By To  ${payload}`,
    })),
    on(todoListApiEvents.todoAdded, ({ payload }) => ({
      message: `Todo Added: ${payload.title}`,
    })),
    on(todoListApiEvents.todoDeleted, ({ payload }) => ({
      message: `Todo Deleted: ${payload.title}`,
    })),
    on(todoListApiEvents.todoMarkedCompleted, ({ payload }) => ({
      message: `Todo Marked Completed: ${payload.title}`,
    })),
  ),
);
