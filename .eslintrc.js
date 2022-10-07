module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:vue/essential',
    '@vue/prettier',
    'plugin:prettier/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:vue/base',
  ],
  rules: {
    'prettier/prettier': 0,
    semi: ['error', 'always'],
    'no-console': 'off',
    'no-debugger': 'off',
    quotes: ['error', 'single'],
    'no-unused-vars': 'off',
    'prefer-const': 'off',
    'no-empty-function': 'off',
    'no-control-regex': 0,
    '@typescript-eslint/no-unused-vars': ['warn'],
    '@typescript-eslint/prefer-as-const': ['warn'],
    '@typescript-eslint/ban-types': 0,
    '@typescript-eslint/no-inferrable-types': ['warn'],
    '@typescript-eslint/no-this-alias': 0,
    '@typescript-eslint/no-explicit-any': 0,
    '@typescript-eslint/no-empty-function': ['error'],
  },
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
    ecmaVersion: 6,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
      modules: true,
    },
  },
};
