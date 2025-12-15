import { http, HttpResponse } from 'msw';

export const bffHandlers = [
  http.get('/bff/user', () => {
    return HttpResponse.json({
      authenticated: true,
      id: '123',
      sub: 'student@company.com',
      claims: [],
    });
  }),
];
//`/bff/login?returnUrl=${redirectUrl}`;
