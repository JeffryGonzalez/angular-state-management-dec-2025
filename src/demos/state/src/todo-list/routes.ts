import { Routes } from '@angular/router';
import { TodoListComponent } from './todo-list';
export const TODO_LIST_ROUTES: Routes = [
  {
    path: '',
    component: TodoListComponent,
    children: [],
  },
];
