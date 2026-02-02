import eslint from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import eslintConfigPrettier from 'eslint-config-prettier';

const globalFiles = ['**/*.{js,ts}'];

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    languageOptions: {
      globals: globals.browser,
    },
  },
  {
    ignores: ['**/*.config.{js,mjs,cjs,ts}', 'coverage', 'dist', 'src/assets/legacy-customize'],
  },
  {
    ...eslint.configs.recommended,
    files: globalFiles,
  },
  ...tseslint.configs.recommended.map((config) => ({
    ...config,
    files: globalFiles,
  })),
  {
    files: globalFiles,
    name: 'base/typescript',
    rules: {
      eqeqeq: 'error',
      '@typescript-eslint/naming-convention': [
        'error',
        {
          selector: 'default',
          format: ['camelCase'],
        },
        {
          selector: 'variable',
          format: ['camelCase'],
        },
        {
          selector: 'function',
          format: ['camelCase'],
        },
        {
          selector: 'class',
          format: ['PascalCase'],
        },
        {
          selector: 'interface',
          format: ['PascalCase'],
          custom: {
            regex: '^[A-Z][a-z]',
            match: true,
          },
        },
        {
          selector: 'typeAlias',
          format: ['PascalCase'],
          custom: {
            regex: '^[A-Z][a-z]',
            match: true,
          },
        },
        {
          selector: 'typeProperty',
          format: null,
          leadingUnderscore: 'allow',
          trailingUnderscore: 'allow',
        },
        {
          selector: 'typeParameter',
          format: ['PascalCase'],
          custom: {
            regex: '^[A-Z]$',
            match: true,
          },
        },
        {
          selector: 'enum',
          format: ['PascalCase'],
        },
        {
          selector: 'enumMember',
          format: null,
          custom: {
            regex: `^['"]?[A-Z]+([-_][A-Z]+)*['"]?$`,
            match: true,
          },
        },
        {
          selector: 'objectLiteralProperty',
          format: null,
        },
        {
          selector: 'import',
          format: ['camelCase', 'PascalCase'],
        },
      ],
      'no-console': ['error', { allow: ['warn', 'error', 'info'] }],
      'no-useless-concat': 'error',
      '@typescript-eslint/array-type': 'error', // Enforce using `T[]` instead of `Array<T>`
      'sort-imports': [
        'error',
        {
          allowSeparatedGroups: true,
          ignoreCase: false,
          ignoreDeclarationSort: true,
          ignoreMemberSort: false,
          memberSyntaxSortOrder: ['none', 'all', 'multiple', 'single'],
        },
      ],
      'no-restricted-syntax': [
        'error',
        {
          selector: 'ExportDefaultDeclaration',
          message: 'Prefer named exports',
        }, // Block default exports
        {
          selector: 'ImportDeclaration[specifiers.length = 0]',
          message: 'Empty imports are not allowed',
        }, // Block empty imports
      ],
    },
  },
  {
    rules: {
      'no-restricted-syntax': ['off'],
    },
  },
  eslintConfigPrettier,
];
