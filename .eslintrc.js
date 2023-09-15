module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
  ],
  overrides: [
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: [
    'react',
  ],
  rules: {
    'quote-props': ['error', 'consistent'],
    'import/extensions': [0, 'always'],
    'react/jsx-filename-extension': [1, { 'extensions': ['.js', '.jsx'] }],
  },
};
