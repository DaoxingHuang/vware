module.exports = {
  'env': {
    'browser': false,
    'es6': true,
  },
  'extends': [
    'plugin:react/recommended',
    'google',
  ],
  'globals': {
    'Atomics': 'readonly',
    'SharedArrayBuffer': 'readonly',
  },
  'parserOptions': {
    'ecmaFeatures': {
      'jsx': true,
    },
    'ecmaVersion': 2018,
    'sourceType': 'module',
    "parser": "babel-eslint"
  },
  'plugins': [
    'react',
  ],
  'rules': {
  },
};
