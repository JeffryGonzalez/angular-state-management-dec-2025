import { HttpHandler, HttpResponse, http } from 'msw';
export const handlers: HttpHandler[] = [
  http.get('/api/xusers/{:id}/profile', ({ params }) => {
    return HttpResponse.json({
      id: params['id'],
      info: {
        firstName: 'John',
        lastName: 'Doe',
      },
      contactInfo: {
        email: 'john.doe@example.com',
        phone: '1234567890',
        preferredContactMethod: 'email',
      },
    });
  }),
];
