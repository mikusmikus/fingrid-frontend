module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: [
    'simple-import-sort',
    'unused-imports',
    'import',
    '@typescript-eslint',
  ],
  extends: [
    'plugin:prettier/recommended',
    'turbo',
    'plugin:tailwindcss/recommended',
  ],
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    '@typescript-eslint/ban-ts-comment': 'off',
    'unused-imports/no-unused-imports': 'warn',
    'no-console': 'warn',
    'no-debugger': 'error',
    'no-tabs': ['error', { allowIndentationTabs: true }],
    'no-unused-vars': 'warn',
    'unused-imports/no-unused-vars': 'warn',
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',
  },
};
