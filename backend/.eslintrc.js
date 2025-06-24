// .eslintrc.cjs
module.exports = {
    env: {
        node: true,
        commonjs: true,
        es2021: true,
    },
    extends: ['eslint:recommended', 'plugin:prettier/recommended'],
    parserOptions: {
        ecmaVersion: 'latest',
    },
    rules: {
        'prettier/prettier': 'error',
        'no-console': 'warn',
        'no-unused-vars': 'warn',
        'padding-line-between-statements': [
            'warn',
            { blankLine: 'always', prev: 'function', next: 'function' }, // 👈 this will make you a line after a function defination
        ],
    },
};
