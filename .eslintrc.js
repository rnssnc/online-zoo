module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
    jquery: true,
  },
  extends: ['prettier', 'airbnb-base'],
  parserOptions: {
    ecmaVersion: 12,
  },
  plugins: [],
  rules: {
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: true,
      },
    ],
    'linebreak-style': ['error', 'windows'],
  },
};
