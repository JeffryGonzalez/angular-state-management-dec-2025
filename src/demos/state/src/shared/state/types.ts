import { HttpContextToken } from '@angular/common/http';

export type RequestEntity = {
  id: string;
  timestamp: number;
  method: string;
  name: string;
  kind: 'deletion' | 'addition' | 'update';
  body: unknown;
};

export type ErrorResponseEntity = RequestEntity & {
  statusText: string;
  statusCode: number;
  message?: string;
};
export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';
export const OUTBOX_SOURCED = new HttpContextToken<
  | {
      method: HttpMethod;
      kind: 'deletion' | 'addition' | 'update';
      body: unknown;
      name: string;
    }
  | undefined
>(() => undefined);
export const OUTBOX_SOURCED_ID = new HttpContextToken<string>(() => '');
