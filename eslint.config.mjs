import tseslint from 'typescript-eslint';
import importPlugin from 'eslint-plugin-import';
import unusedImports from 'eslint-plugin-unused-imports';
import prettierPlugin from 'eslint-plugin-prettier';

export default [
  {
    ignores: ['node_modules', 'dist', 'build', '.env'],
  },

  ...tseslint.configs.recommendedTypeChecked.map((config) => ({
    ...config,
    files: ['src/**/*.ts'],
    languageOptions: {
      ...config.languageOptions,
      parserOptions: {
        ...config.languageOptions?.parserOptions,
        projectService: true, // replaces manual `project` setup
      },
      globals: {
        console: 'readonly',
        process: 'readonly',
        module: 'readonly',
        require: 'readonly',
        __dirname: 'readonly',
      },
    },
    plugins: {
      ...config.plugins,
      import: importPlugin,
      'unused-imports': unusedImports,
      prettier: prettierPlugin,
    },
    rules: {
      ...config.rules,
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/consistent-type-imports': [
        'warn',
        { prefer: 'type-imports', fixStyle: 'inline-type-imports' },
      ],
      'import/order': [
        'warn',
        {
          groups: [
            'builtin',
            'external',
            'internal',
            'parent',
            'sibling',
            'index',
          ],
          alphabetize: { order: 'asc', caseInsensitive: true },
        },
      ],
      'unused-imports/no-unused-imports': 'warn',
      'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
      'no-var': 'warn',
      'prefer-const': 'warn',
      'prettier/prettier': 'warn',
    },
  })),

  // JS / config files
  ...tseslint.configs.recommended.map((config) => ({
    ...config,
    files: ['eslint.config.{js,cjs,mjs}', '*.config.{js,cjs,mjs,ts}'],
    languageOptions: {
      ...config.languageOptions,
      parserOptions: { projectService: false },
    },
  })),
];
