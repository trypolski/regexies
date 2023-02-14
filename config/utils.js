const glob = require('glob');
const path = require('path')
const constants = require('./constants');

const defaultEntries = {
  [constants.HOME_PAGE_NAME]: [path.resolve(__dirname, '../views/pages/index.js'), path.resolve(__dirname, '../views/pages/index.scss')],
  [constants.PUBLIC_FILE_NAME]: [path.resolve(__dirname, '../views/scripts/index.js'), path.resolve(__dirname, '../views/styles/index.scss')],
  [constants.REGEXIES_NAME]: [path.resolve(__dirname, '../index.js')]
}

exports.getEntries = function() {
  return glob
    .sync(`${constants.PAGES_FOLDER_PATH}**/main.js`)
    .reduce((entriesObj, filePath) => {
      console.log(entriesObj, filePath)
      const pageFolderName = filePath.match(constants.CUSTOM_REGEX);
      const entryName = pageFolderName[1];
      entriesObj[entryName] = [
        filePath,
        filePath.replace('main.js', 'style.scss')
      ];
      return entriesObj;
    }, defaultEntries);
}

exports.getOutputFilenameJS = function(pathData) {
  switch(pathData.chunk.name) {
    case constants.HOME_PAGE_NAME:
      return 'index.js';
    case constants.PUBLIC_FILE_NAME:
      return 'public/js/scripts.js';
    case constants.REGEXIES_NAME:
      return 'public/regexies/regexies.js';
    default:
      return '[name]/index.js';
  }
}

exports.getOutputFilenameCSS = function(pathData) {
  switch(pathData.chunk.name) {
    case constants.HOME_PAGE_NAME:
      return 'index.css';
    case constants.PUBLIC_FILE_NAME:
      return 'public/css/styles.css';
    default:
      return '[name]/index.css';
  }
}
