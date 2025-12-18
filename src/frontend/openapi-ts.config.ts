import { defineConfig } from '@hey-api/openapi-ts';

export default defineConfig({
  input: ['./open-api-specs/Movies.Api.json'],
  output: [
    {
      format: 'prettier',
      lint: 'eslint',
      path: './projects/apps/class/common/movies/types/api',
    },
  ],
  plugins: [
    {
      name: 'zod',
      exportFromIndex: true,
      // types: {
      //   infer: true,
      // },
      definitions: {
        name: '{{name}}Schema',
        types: {
          infer(name) {
            return `${name}Model`;
          },
        },
      },
      requests: false,
      responses: false,
      // requests: {
      //   name: '{{name}}Schema',
      //   types: {
      //     infer(name) {
      //       return `${name}RequestModel`;
      //     },
      //   },
      // },
      // responses: {
      //   name: '{{name}}Response',
      //   types: {
      //     infer(name) {
      //       return `${name}ResponseModel`;
      //     },
      //   },
      // },
    },
  ],
});
