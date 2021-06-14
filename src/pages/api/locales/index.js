const path = require('path');
const { I18n } = require('i18n');

const i18n = new I18n({
  locales: ['en', 'es'],
  directory: path.join(__dirname)
})

module.exports = i18n;
