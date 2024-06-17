/** @type {import("eslint").Linter.Config} */
module.exports = {
  extends: ['@rocketseat/eslint-config/next'],
  puglins: ['simple-import-sort'],
  rules: {
    'simple-import-sort/imports': 'error',
  },
}
