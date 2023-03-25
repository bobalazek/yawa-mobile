module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint/eslint-plugin'],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', '@react-native-community'],
  rules: {
    'prettier/prettier': 'off',
    'react/react-in-jsx-scope': 'off',
  },
};
