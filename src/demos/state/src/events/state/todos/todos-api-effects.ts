import { inject } from '@angular/core';
import { mapResponse } from '@ngrx/operators';
import { signalStoreFeature } from '@ngrx/signals';
import { Events, withEffects } from '@ngrx/signals/events';
import { exhaustMap, mergeMap } from 'rxjs';
import { TodoListApi } from './todo-list-api';
import { todoListApiEvents, todoListPageEvents } from './todo-list-events';

export function withTodosApiEffects() {
  return signalStoreFeature(
    withEffects(
      (store, events = inject(Events), apiService = inject(TodoListApi)) => ({
        loadTodos$: events.on(todoListPageEvents.loadTodos).pipe(
          exhaustMap(() =>
            apiService.getTodoList().pipe(
              mapResponse({
                next: (todos) => todoListApiEvents.todosLoaded(todos),
                error: (error) => console.error('Failed to load todos', error),
              }),
            ),
          ),
        ),
        deleteTodo$: events.on(todoListPageEvents.delete).pipe(
          mergeMap(({ payload: todo }) =>
            apiService.deleteTodoItem(todo.id).pipe(
              mapResponse({
                next: () => todoListApiEvents.todoDeleted(todo),
                error: (error) => console.error('Failed to delete todo', error),
              }),
            ),
          ),
        ),
        markCompleted$: events.on(todoListPageEvents.markCompleted).pipe(
          mergeMap(({ payload: todo }) =>
            apiService.updateTodoItem({ ...todo, completed: true }).pipe(
              mapResponse({
                next: (updatedTodo) =>
                  todoListApiEvents.todoMarkedCompleted(updatedTodo),
                error: (error) =>
                  console.error('Failed to mark todo as completed', error),
              }),
            ),
          ),
        ),
        addTodo$: events.on(todoListPageEvents.addTodo).pipe(
          mergeMap(({ payload: todo }) =>
            apiService.addTodoItem(todo).pipe(
              mapResponse({
                next: (addedTodo) => todoListApiEvents.todoAdded(addedTodo),
                error: (error) => console.error('Failed to add todo', error),
              }),
            ),
          ),
        ),
      }),
    ),
  );
}
