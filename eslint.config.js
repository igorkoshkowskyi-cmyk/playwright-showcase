import eslint from '@eslint/js';
import playwright from 'eslint-plugin-playwright';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  {
languageOptions: {
  parserOptions: {
    projectService: {
      allowDefaultProject: ['eslint.config.js'],
    },
    tsconfigRootDir: import.meta.dirname,
  },
},
  },
  {
    files: ['tests/**/*.ts', 'pages/**/*.ts'],
    ...playwright.configs['flat/recommended'],
  },
  {
    rules: {
      '@typescript-eslint/no-floating-promises': 'error',
      '@typescript-eslint/no-misused-promises': 'error',
      ...playwright.configs['flat/recommended'].rules,
        'playwright/expect-expect': ['warn', { 
            assertFunctionNames: ['expect', 'expectLoaded', 'expect*']
        }]
    },
  }
);
