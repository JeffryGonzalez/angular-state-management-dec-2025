import { http, HttpResponse } from 'msw';

export const bffHandlers = [
  http.get('/bff/user', () => {
    return HttpResponse.json({
      authenticated: true,
      id: 'a42069',
      sub: 'student@company.com',
      claims: [],
    });
  }),
];
//`/bff/login?returnUrl=${redirectUrl}`;
