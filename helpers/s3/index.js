'use strict';
let functions = require("./functions.js");
module.exports = function(config={}) {
  functions.init(config);
  return {
    getFiles: functions.getFiles,
    getUrl: functions.getUrl,
    getSignedUrl: functions.getSignedUrl,
    updateUrlInAttrArray: functions.updateUrlInAttrArray,
    updateSignedUrlInArray: functions.updateSignedUrlInArray,
    updateUrlInArrayOfProperties: functions.updateUrlInArrayOfProperties,
    uploadFile: functions.uploadFile,
    genKeyFromFilename: functions.genKeyFromFilename
  }
};
