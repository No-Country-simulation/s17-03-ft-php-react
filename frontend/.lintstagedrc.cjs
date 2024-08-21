const path = require('path');

const buildEslintCommand = filenames =>
  `next lint --fix --file ${filenames.map(f => path.relative(process.cwd(), f)).join(' --file ')}`;

const buildPrettierCommand = filenames =>
  `prettier --write --file ${filenames.map(f => path.relative(process.cwd(), f)).join(' --file ')} --ignore-path .prettierignore .`;

module.exports = {
  './*.{js,ts,cjs}': [buildPrettierCommand, buildEslintCommand],
  './src/**/*.{js,jsx,ts,tsx}': [buildPrettierCommand, buildEslintCommand],
};
