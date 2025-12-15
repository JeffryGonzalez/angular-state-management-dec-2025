import { ProductHandler } from './products-handler';
import { TodoListHandlers } from './todos-handler';

export const handlers = [...ProductHandler, ...TodoListHandlers];
