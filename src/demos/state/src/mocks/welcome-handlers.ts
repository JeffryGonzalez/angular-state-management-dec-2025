import { http, HttpResponse } from 'msw';

export const WELCOME_HANDLERS = [
  http.get('/api/hello', () => {
    return HttpResponse.json({
      message: 'Welcome to Angular Starter',
      delivered: new Date().toISOString(),
    });
  }),
];
