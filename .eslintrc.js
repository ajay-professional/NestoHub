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
        ecmaVersion: 'latest',
    },
    rules: {
        'arrow-body-style': 'off',
        'arrow-parens': ['error', 'as-needed', { requireForBlockBody: true }],
        'comma-dangle': [
            'off',
            'always-multiline',
        ],
        'consistent-return': 'warn',
        curly: 'error',
        'dot-notation': 'warn',
        'eol-last': 'error',
        eqeqeq: [
            'error',
            'smart',
        ],
        'id-match': 'error',
        'import/extensions': 'off',
        'import/no-deprecated': 'warn',
        'import/prefer-default-export': 'off',
        indent: [
            'error',
            4,
        ],
        'lines-between-class-members': 'off',
        'max-len': [
            'error',
            {
                code: 120,
                ignorePattern: '^import |^export |^require (.*?)$',
            },
        ],
        'new-cap': [
            'error',
            {
                capIsNew: false,
            },
        ],
        'newline-per-chained-call': 'off',
        'new-parens': 'error',
        'no-bitwise': 'error',
        'no-param-reassign': 'warn',
        'no-proto': 'off',
        'no-underscore-dangle': 'off',
        'no-use-before-define': 'warn',
        'no-useless-constructor': 'off',
        'no-var': 'error',
        'object-curly-newline': 'off',
        'object-curly-spacing': [
            'warn',
            'always',
        ],
        'object-shorthand': 'warn',
        'one-var-declaration-per-line': 'error',
        'operator-linebreak': 'off',
        'padded-blocks': 'warn',
        'prefer-arrow-callback': 'warn',
        'prefer-destructuring': 'warn',
        'prefer-object-spread': 'off',
        'prefer-template': 'warn',
        'quote-props': 'warn',
        quotes: [
            'error',
            'single',
        ],
        'require-jsdoc': 0,
        'space-before-blocks': 'error',
        'space-before-function-paren': [
            'error',
            {
                anonymous: 'always',
                named: 'never',
                asyncArrow: 'always',
            },
        ],
        'space-in-parens': [
            'error',
            'never',
        ],
        'vars-on-top': 'warn',
        'linebreak-style': 'off',
    },
};
