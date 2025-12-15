import eslint from '@eslint/js';

import angular from 'angular-eslint';
import { defineConfig, globalIgnores } from 'eslint/config';
import { configs as tseslint } from 'typescript-eslint';
import sheriff from '@softarc/eslint-plugin-sheriff';

export default defineConfig([
  globalIgnores(['.angular/**', 'src/mockServiceWorker.js', 'dist/**']),
  {
    files: ['**/*.html'],
    plugins: {
      '@softarc/sheriff': sheriff,

      angular: angular.templatePlugin,
    },
    languageOptions: {
      parser: angular.templateParser,
    },
  },
  {
    files: ['**/*.ts'],
    extends: [
      eslint.configs.recommended,
      tseslint.strict,
      angular.configs.tsRecommended,
      sheriff.configs.all,
    ],

    processor: angular.processInlineTemplates,
    rules: {
      '@typescript-eslint/no-invalid-void-type': ['off'],

      '@typescript-eslint/naming-convention': [
        'error',
        {
          selector: 'variable',
          modifiers: ['const'],
          format: ['camelCase'],
        },
      ],
      '@typescript-eslint/no-extraneous-class': 'off',
      '@typescript-eslint/consistent-type-definitions': 'off',
      '@angular-eslint/directive-selector': [
        'off',
        {
          type: 'attribute',
          prefix: 'app',
          style: 'camelCase',
        },
      ],

      '@angular-eslint/component-selector': [
        'off',
        {
          type: 'element',
          prefix: 'app',
          style: 'kebab-case',
        },
      ],
    },
  },
]);
