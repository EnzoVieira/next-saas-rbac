/** @type {import("eslint").Linter.Config} */
module.exports = {
  extends: ['@rocketseat/eslint-config/react'],
  puglins: ['simple-import-sort'],
  rules: {
    'simple-import-sort/imports': 'error',
  },
}
