import { defineConfig } from '@hey-api/openapi-ts';

export default defineConfig({
  input: ['./open-api-specs/Movies.Api.json'],
  output: [
    {
      format: 'prettier',
      lint: 'eslint',
      path: './projects/apps/class/common/api-clients/movies',
    },
  ],
  plugins: [
    'zod',
    {
      name: '@hey-api/client-angular',
      throwOnError: true,
    },
    '@hey-api/schemas',
    {
      asClass: true,
      name: '@hey-api/sdk',
    },
    {
      name: '@hey-api/sdk',
      validators: true,
    },
  ],
});
