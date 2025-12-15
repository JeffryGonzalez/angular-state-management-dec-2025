import { signalStoreFeature, type } from '@ngrx/signals';
import {
  addEntity,
  EntityState,
  removeEntity,
  setAllEntities,
  setEntity,
} from '@ngrx/signals/entities';
import { ApiTodoListItem } from './todo-list-api';
import { on, withReducer } from '@ngrx/signals/events';
import { todoListApiEvents } from './todo-list-events';

export function withTodosReducer() {
  return signalStoreFeature(
    { state: type<EntityState<ApiTodoListItem>>() },
    withReducer(
      on(todoListApiEvents.todosLoaded, ({ payload }) =>
        setAllEntities(payload),
      ),
      on(todoListApiEvents.todoAdded, ({ payload }) => addEntity(payload)),
      on(todoListApiEvents.todoDeleted, ({ payload }) =>
        removeEntity(payload.id),
      ),
      on(todoListApiEvents.todoMarkedCompleted, ({ payload }) =>
        setEntity(payload),
      ),
    ),
  );
}
