module.exports = {
    parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@babel/eslint-parser',
    ecmaVersion: 2020, // or "latest"
    sourceType: "module" // allows 'import' and 'export'
  },
  env: {
    es6: true, // enables ES6 globals
    browser: true, // or node: true, depending on your project
  },
  rules: {
    "no-unused-vars": "off", // disable unused vars check
    "no-console": "warn",    // warn when console.log is used
    "semi": "off"
  }
};
