module.exports = {
  root: true, // Denotes that this is the root ESLint configuration file
  env: { browser: true, es2020: true }, // Specifies the environment (browser and ES2020)
  extends: [
    'eslint:recommended', // Use ESLint's recommended rules
    'plugin:@typescript-eslint/recommended', // Use recommended TypeScript rules
    'plugin:react-hooks/recommended', // Use recommended rules for React hooks
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'], // Ignore specified patterns (dist and .eslintrc.cjs)
  parser: '@typescript-eslint/parser', // Specifies the ESLint parser for TypeScript
  plugins: ['react-refresh'], // Use the React Refresh plugin
  rules: {
    'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
  },
};

/*
This configuration includes ESLint's recommended rules, TypeScript rules, and React Hooks rules.
It ignores the 'dist' directory and the '.eslintrc.cjs' file.

The parser is set to '@typescript-eslint/parser',
and the 'react-refresh' plugin is used with a specific rule related to exporting components.

The rule 'react-refresh/only-export-components':
['warn', { allowConstantExport: true }] allows constant exports while using React Refresh.
This is useful in development when using tools like React Fast Refresh.

The file name .eslintrc.cjs suggests that this is a CommonJS module format for Node.js. 
This configuration is suitable for TypeScript projects with React, and it provides a solid foundation 
for linting your code.
*/
