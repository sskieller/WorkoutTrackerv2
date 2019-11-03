// https://www.npmjs.com/package/eslint
// https://eslint.org/docs/rules/
module.exports = {
  'env': {
    'browser': true,
    'es6': true,
  },
  'extends': [
    'google',
  ],
  'globals': {
    'Atomics': 'readonly',
    'SharedArrayBuffer': 'readonly',
  },
  'parserOptions': {
    'ecmaVersion': 2018,
    'sourceType': 'module',
  },
  'rules': {
    'semi': ["error","always"],
    'semi-style': ["error", "last"],
    'quotes': ["error", "double"],
    'curly':["error", "multi", "consistent"],
    'strict':["error", "safe"],
    'indent':["error", "tab"],
    'space-in-parens':["error","always"],
    'spaced-comment':["error","always"]
  },
};
