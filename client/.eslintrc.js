// .eslintrc.cjs
module.exports = {
    root: true, // make sure this is the root ESLint config
    parser: '@typescript-eslint/parser', // for TypeScript
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {
            jsx: true,
        },
    },
    env: {
        browser: true,
        node: true,
        es2021: true,
    },
    extends: [
        'airbnb-base', // 🔍 base Airbnb rules (no React stuff)
        'plugin:@typescript-eslint/recommended', // 📘 TypeScript rules
        'plugin:react/recommended', // ⚛️ Core React rules
        'plugin:react-hooks/recommended', // 🪝 React Hooks best practices
        'plugin:jsx-a11y/recommended', // ♿ Accessibility rules
        'plugin:prettier/recommended', // 💅 Prettier last — disables conflicting rules
    ],

    plugins: [
        'react',
        'jsx-a11y',
        'import',
        '@typescript-eslint',
        'prettier',
        'simple-import-sort',
    ],
    rules: {
        // 👇 Customize strict rules here

        // === Prettier ===
        'prettier/prettier': 'error', // Enforce prettier formatting

        // === React Specific ===
        'react/react-in-jsx-scope': 'off', // Not needed with React 17+
        'react/jsx-filename-extension': [1, { extensions: ['.tsx', '.ts', '.jsx', '.js'] }],
        'react/prop-types': 'off', // we use TS, no prop-types needed

        // === Import Rules ===
        'import/extensions': [
            'error',
            'ignorePackages',
            {
                js: 'never',
                jsx: 'never',
                ts: 'never',
                tsx: 'never',
            },
        ],
        'simple-import-sort/imports': 'warn',
        'simple-import-sort/exports': 'warn',
        'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
        'import/prefer-default-export': 'off', // allow named exports

        // === TypeScript Rules ===
        '@typescript-eslint/no-unused-vars': ['error'],
        '@typescript-eslint/explicit-function-return-type': 'warn',
        '@typescript-eslint/no-explicit-any': 'warn',

        // === Misc ===
        'no-console': 'warn', // allow console but show warning
        'no-unused-vars': 'off', // handled by TS
    },
    settings: {
        react: {
            version: 'detect', // 👈 auto-detect React version from package.json
        },
        'import/resolver': {
            typescript: {}, // 👈 this makes eslint resolve TS paths
        },
    },
};
