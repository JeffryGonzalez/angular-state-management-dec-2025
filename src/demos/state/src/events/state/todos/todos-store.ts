import { signalStore } from '@ngrx/signals';
import { withEntities } from '@ngrx/signals/entities';
import { ApiTodoListItem } from './todo-list-api';
import { withTodosApiEffects } from './todos-api-effects';
import { withTodosReducer } from './todos-reducer';
import { withDevtools } from '@angular-architects/ngrx-toolkit';

export const TodosStore = signalStore(
  withEntities<ApiTodoListItem>(),
  withDevtools('events-todo'),
  withTodosReducer(),
  withTodosApiEffects(),
);
