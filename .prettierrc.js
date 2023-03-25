module.exports = {
  plugins: ['@trivago/prettier-plugin-sort-imports'],
  printWidth: 120,
  tabWidth: 2,
  useTabs: false,
  singleQuote: true,
  semi: true,
  importOrder: ['^[./]'],
  importOrderParserPlugins: ['typescript', 'jsx', 'classProperties', 'decorators-legacy'],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
};
