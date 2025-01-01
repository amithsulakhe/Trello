module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  plugins: ["perfectionist", "unused-imports", "prettier"],
  extends: ["airbnb", "airbnb/hooks", "prettier"],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
  },
  settings: {
    react: {
      version: "detect",
    },
    "import/resolver": {
      node: {
        extensions: [".js", ".jsx", ".ts", ".tsx", ".json"],
        paths: ["."],
      },
      alias: {
        map: [["@", "."]],
        extensions: [".js", ".jsx", ".ts", ".tsx", ".json"],
      },
    },
  },
  rules: {
    "no-use-before-define": 0,
    "no-alert": 0,
    camelcase: 0,
    "no-console": 0,
    "no-unused-vars": 0,
    "no-nested-ternary": 0,
    "no-param-reassign": 0,
    "no-underscore-dangle": 0,
    "no-restricted-exports": 0,
    "no-promise-executor-return": 0,
    "import/prefer-default-export": 0,
    "import/extensions": 0,
    "import/no-unresolved": 0, // Added to allow @ imports
    "prefer-destructuring": [1, { object: true, array: false }],
    // react
    "react/prop-types": 0,
    "react/no-children-prop": 0,
    "react/react-in-jsx-scope": 0,
    "react/no-array-index-key": 0,
    "react/require-default-props": 0,
    "react/jsx-props-no-spreading": 0,
    "react/function-component-definition": 0,
    "react/jsx-no-duplicate-props": [1, { ignoreCase: false }],
    "react/jsx-no-useless-fragment": [1, { allowExpressions: true }],
    "react/no-unstable-nested-components": [1, { allowAsProps: true }],
    // jsx-a11y
    "jsx-a11y/anchor-is-valid": 0,
    "jsx-a11y/control-has-associated-label": 0,
    // unused imports
    "unused-imports/no-unused-imports": 1,
    "unused-imports/no-unused-vars": [
      0,
      {
        vars: "all",
        varsIgnorePattern: "^_",
        args: "after-used",
        argsIgnorePattern: "^_",
      },
    ],
    // perfectionist
    "perfectionist/sort-exports": [1, { order: "asc", type: "line-length" }],
    "perfectionist/sort-named-imports": [
      1,
      { order: "asc", type: "line-length" },
    ],
    "perfectionist/sort-named-exports": [
      1,
      { order: "asc", type: "line-length" },
    ],
    "perfectionist/sort-imports": [
      1,
      {
        order: "asc",
        type: "line-length",
        "newlines-between": "always",
        groups: [
          "style",
          "type",
          ["builtin", "external"],
          "custom-mui",
          "custom-routes",
          "custom-hooks",
          "custom-utils",
          "internal",
          "custom-components",
          "custom-sections",
          "custom-auth",
          "custom-types",
          ["parent", "sibling", "index"],
          ["parent-type", "sibling-type", "index-type"],
          "object",
          "unknown",
        ],
        "custom-groups": {
          value: {
            ["custom-mui"]: "@mui/**",
            ["custom-auth"]: "@/auth/**",
            ["custom-hooks"]: "@/hooks/**",
            ["custom-utils"]: "@/utils/**",
            ["custom-types"]: "@/types/**",
            ["custom-routes"]: "@/routes/**",
            ["custom-sections"]: "@/sections/**",
            ["custom-components"]: "@/components/**",
          },
        },
        "internal-pattern": ["@/**"],
      },
    ],
  },
};
