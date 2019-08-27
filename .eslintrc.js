module.exports = {
    "root": true,
    "env": {
        "browser": true,
        "node": true,
        "jasmine": true,
    },
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaVersion": 2019,
        "sourceType": "module",
        "ecmaFeatures": {
            "jsx": false,
        },
        "project": "tsconfig.json",
    },
    "plugins": [
        "wix-editor",
        "unicorn",
        "import",
        "@typescript-eslint/tslint",
        "only-warn",
    ],
    "extends": [
        "eslint:recommended",
        "plugin:unicorn/recommended",
        "plugin:import/errors",
        "plugin:import/warnings",
        "plugin:import/typescript",
    ],
    "rules": {
        "no-unused-vars": 0,
        "quotes": [1, "single", { "allowTemplateLiterals": true }],
        "semi": [1, "always"],
        // wix-editor
        "wix-editor/no-instanceof-array": 1,
        "wix-editor/no-not-not": 1,
        "wix-editor/no-unneeded-match": 1,
        "wix-editor/prefer-filter": 1,
        "wix-editor/prefer-ternary": 1,
        "wix-editor/return-boolean": 1,
        "wix-editor/simplify-boolean-expression": 1,
        // unicorn
        "unicorn/import-index": 0,
        "unicorn/catch-error-name": 0,
        "unicorn/prevent-abbreviations": [1,
            {
                "replacements": {
                    "err": {
                        "error": false,
                    },
                    "args": {
                        "arguments": false,
                    },
                    "componentRef": {
                        "componentReference": false,
                    },
                    "viewContainerRef": {
                        "viewContainerReference": false,
                    },
                }
            }
        ],
        // import
        "import/newline-after-import": 0,
        "import/no-duplicates": 1,
        "import/max-dependencies": [1, { "max": 10 }],
        // tslint
        "@typescript-eslint/tslint/config": [1, {
            lintFile: "./tslint.json",
        }],
    }
};
