import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { withOutboxHttpContext } from '@outbox';

export type ApiTodoListItem = { id: string; title: string; completed: boolean };

export const FEATURE_NAME = 'todo-list';

const API_URL = 'https://some-api/todo-list';
export class TodoListApi {
  #http = inject(HttpClient);

  getTodoList() {
    return this.#http.get<ApiTodoListItem[]>(API_URL);
  }
  deleteTodoItem(id: string) {
    return this.#http.delete<void>(`${API_URL}/${id}`, {
      context: withOutboxHttpContext(FEATURE_NAME, id, 'DELETE'),
    });
  }

  addTodoItem(item: Omit<ApiTodoListItem, 'id' | 'completed'>) {
    return this.#http.post<ApiTodoListItem>(API_URL, item, {
      context: withOutboxHttpContext(FEATURE_NAME, item, 'POST'),
    });
  }
  updateTodoItem(item: ApiTodoListItem) {
    return this.#http.put<ApiTodoListItem>(`${API_URL}/${item.id}`, item, {
      context: withOutboxHttpContext(FEATURE_NAME, item, 'PUT'),
    });
  }
}
