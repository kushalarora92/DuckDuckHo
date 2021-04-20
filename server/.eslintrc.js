module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
  },
  extends: [
    'airbnb-base',
  ],
  parserOptions: {
    ecmaVersion: 12,
  },
  rules: {
    indent: ['error', 2],
    'max-len': ['error', 180],
    'class-methods-use-this': 0,
    'no-underscore-dangle': 0,
  },
};
