import { Routes } from '@angular/router';
import { EventsComponent } from './events-component';
import { CounterComponent } from './pages/counter';
import { TodosComponent } from './pages/todos';
import { TodoListApi } from './state/todos/todo-list-api';
export const EVENTS_ROUTES: Routes = [
  {
    path: '',
    component: EventsComponent,
    children: [
      {
        path: 'counter',
        component: CounterComponent,
      },
      {
        path: 'todos',
        component: TodosComponent,
        providers: [TodoListApi],
      },
    ],
  },
];
