import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';

export type ApiTodoListItem = { id: string; title: string; completed: boolean };
export type ApiTodoListItemCreate = Omit<ApiTodoListItem, 'id' | 'completed'>;

export const FEATURE_NAME = 'todo-list';

const API_URL = 'https://some-api/todo-list';
export class TodoListApi {
  #http = inject(HttpClient);

  getTodoList() {
    return this.#http.get<ApiTodoListItem[]>(API_URL);
  }
  deleteTodoItem(id: string) {
    return this.#http.delete<void>(`${API_URL}/${id}`);
  }

  addTodoItem(item: ApiTodoListItemCreate) {
    return this.#http.post<ApiTodoListItem>(API_URL, item);
  }
  updateTodoItem(item: ApiTodoListItem) {
    return this.#http.put<ApiTodoListItem>(`${API_URL}/${item.id}`, item);
  }
}
