module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": [
        "plugin:react/recommended",
        "airbnb"
    ],
    "globals": {
        Atomics: 'readonly',
        SharedArrayBuffer: 'readonly',
    },
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    "plugins": [
        "react"
    ],
    "rules": {
        "import/no-named-as-default": 0,
        "react/jsx-filename-extension": [1, { "extensions": [".js"] }],
        "react/prop-types": 0,
        "no-underscore-dangle": 0,
        "comma-dangle": ["error", "never"],
        "react/no-unused-state": 0
    }
};

