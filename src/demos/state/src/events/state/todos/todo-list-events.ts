import { type } from '@ngrx/signals';
import { eventGroup } from '@ngrx/signals/events';
import { ApiTodoListItem, ApiTodoListItemCreate } from './todo-list-api';

export const todoListPageEvents = eventGroup({
  source: 'Todo List Page',
  events: {
    loadTodos: type<void>(),
    addTodo: type<ApiTodoListItemCreate>(),
    delete: type<ApiTodoListItem>(),
    markCompleted: type<ApiTodoListItem>(),
  },
});

export const todoListApiEvents = eventGroup({
  source: 'Todo List API',
  events: {
    todosLoaded: type<ApiTodoListItem[]>(),
    todoAdded: type<ApiTodoListItem>(),
    todoDeleted: type<ApiTodoListItem>(),
    todoMarkedCompleted: type<ApiTodoListItem>(),
  },
});
