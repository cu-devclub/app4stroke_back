module.exports = {
  env: {
    commonjs: true,
    es6: true,
    node: true,
  },
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'prettier'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'eslint-config-prettier',
  ],
  rules: {
    // 'max-len': ['error', { code: 120 }],
    'prettier/prettier': 'error',
  },
};
