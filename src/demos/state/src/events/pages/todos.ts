import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { TodosStore } from '../state/todos/todos-store';
import { injectDispatch } from '@ngrx/signals/events';
import { todoListPageEvents } from '../state/todos/todo-list-events';

@Component({
  selector: 'app-todos',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  providers: [TodosStore],
  template: `
    <p>Todos</p>
    <button class="btn btn-primary" (click)="dispatch.loadTodos()">
      Load Todos
    </button>

    @for (todo of store.entities(); track todo.id) {
      <div class="card w-96 bg-base-100 shadow-xl m-2">
        <div class="card-body">
          <h2 class="card-title">{{ todo.title }}</h2>

          <div class="card-actions justify-end">
            <button
              class="btn btn-sm btn-success"
              (click)="dispatch.markCompleted(todo)"
            >
              {{ todo.completed ? 'Undo' : 'Complete' }}
            </button>
            <button
              class="btn btn-sm btn-error"
              (click)="dispatch.delete(todo)"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    }
  `,
  styles: ``,
})
export class TodosComponent {
  store = inject(TodosStore);
  dispatch = injectDispatch(todoListPageEvents);
}
