var AWS = require('aws-sdk');
var fs = require('fs'); // For reading uploaded file for s3 upload
var Q = require('q'); // promise libraryd
var crypto = require('crypto'); // promise libraryd
var S3 = this;
var config;
var s3Domain = "s3.amazonaws.com";
var s3bucket ;
exports.init = function(config) {
  AWS.config.region = config.aws_s3.region; // setting region config
  s3bucket = new AWS.S3({
    accessKeyId     : config.aws_s3.accessKeyId,
    secretAccessKey : config.aws_s3.secretAccessKey,
    params: {
      Bucket: config.aws_s3.bucket
    }
  });


}
exports.getFiles=function(dir, files_) {
  files_ = files_ || [];
  var files = fs.readdirSync(dir);
  for (var i in files) {
    var name = dir + '/' + files[i];
    if (fs.statSync(name).isDirectory()) {
      S3.getFiles(name, files_);
    } else {
      files_.push(name);
    }
  }
  return files_;
}


/**
 * a function to return key url
 *
 * @param {String} key -  s3 key
 * @returns {String}  url
 *
 */


exports.getUrl = function(key) {
  if (!key) {
    return "";
  }


  return "https://" + config.aws_s3.bucket + "." + s3Domain + "/" + key;

};

/**
 * a function to return key from fileName
 *
 * @param {String} keyBase -  key base
 * @param {String} fileName -  filename for which hash needs to be created
 * @param {Array} prefixArr -  Array with values to be prefixed before fileName
 * @returns {String} key
 *
 */


exports.genKeyFromFilename = function(keyBase, fileName, prefixArr) {
  if (fileName.length <= 0) {
    return "";
  }
  var ext = fileName.split(".").pop();
  var key = '';
  if (keyBase && keyBase.length > 0) {
    key += keyBase + "/";
  }
  if (prefixArr &&  prefixArr.length > 0) {
    key += prefixArr.join("-");
    key += "-";
  }
  key += crypto.randomBytes(8).toString('hex') + "." + ext;

  return key;

};

/**
 * a function to return key with signed url
 *
 * @param {String} key -  s3 key
 * @returns {String} signed url
 *
 */


exports.getSignedUrl = function(key,bucket) {
  if (!key) {
    return "";
  }

  var url = s3bucket.getSignedUrl('getObject', {
    Bucket: bucket || config.aws_s3.bucket,
    Key: key
  });

  return url;

};

/**
 * a function to process array and update s3 key available in propName of
 * object to s3 url
 *
 * @param {Array} arr - array of object or object
 * @param {string} propName - propertyName which has the s3 key
 * @returns {Array} - updated array or hash with s3 url
 *
 */



exports.updateUrlInAttrArray = function(arr, fields, signed) {

  var funcName = S3.getSignedUrl;
  if (!signed) {
    funcName = S3.getUrl;
  }
  for (var i = 0; i < fields.length; i++) {
    var f = fields[i];
    if (arr && arr[f]) {
      arr[f].attr_value = funcName(arr[f].attr_value);
    }
  }
  return arr;

}

/**
 * a function to process array and update s3 key available in properties array
 * specified  to signed url
 *
 * @param {Array} arr - array of object or object
 * @param {Array} propNames - propertyNames which has the s3 key
 * @returns {Array} - updated array or hash with signed urls
 *
 */



exports.updateUrlInArrayOfProperties = function(arr, propNames, signed) {

  var funcName = S3.getSignedUrl;
  if (!signed) {
    console.log("not signed");
    funcName = S3.getUrl;
  }
  console.log(funcName, signed);
  if (arr instanceof Array) {
    //Loop through and update propertyName with signed url
    for (var i = 0; i < arr.length; i++) {
      var hash = arr[i];

      for (var j in propNames) {
        var propName = propNames[j];
        //If property exists  then update signed url
        if (hash[propName]) {
          hash[propName] = funcName(hash[propName]);
        }
      }
    }
  } else {
    //Its an object
    //If property exists then update signed url
    for (var j in propNames) {
      var propName = propNames[j];
      if (arr[propName]) {
        arr[propName] = funcName(arr[propName]);
      }
    }
  }
  return arr;

}

/**
 * a function to process array and update s3 key available in propName of
 * object to signed url
 *
 * @param {Array} arr - array of object or object
 * @param {string} propName - propertyName which has the s3 key
 * @returns {Array} - updated array or hash with signed urls
 *
 */



exports.updateSignedUrlInArray = function(arr, propName) {

  if (arr instanceof Array) {
    //Loop through and update propertyName with signed url
    for (var i = 0; i < arr.length; i++) {
      var hash = arr[i];

      //If property exists  then update signed url
      if (hash[propName]) {
        hash[propName] = S3.getSignedUrl(hash[propName]);
      }
    }
  } else {
    //Its an object
    //If property exists then update signed url
    if (arr[propName]) {
      arr[propName] = S3.getSignedUrl(arr[propName]);
    }
  }
  return arr;

}

/**
 * a function to upload to s3
 *
 * @param {string} key - key to identify object
 * @param {string} filename - filename to be uploaded
 * @param {boolean} publicRead - set acl of the object
 * @param {boolean} removesourcefile - remove file after upload
 * @returns {object} - promise with error object or key name
 *
 */
exports.uploadFile = function(key, filename, options,flag) {
  var publicRead = options.publicRead;
  var removeSourceFile = options.removeSourceFile;
  var mimeType = options.mimeType;
  var dfd = Q.defer();
  if (!key) {
    setTimeout(function() {
      return dfd.reject(new Error("Key undefined"));
    }, 10);
    return dfd.promise;
  }
  if (!filename) {
    setTimeout(function() {
      return dfd.reject(new Error("filename undefined"));
    }, 10);
    return dfd.promise;
  }
  if(flag!=1){
    filename  = fs.createReadStream(filename);
  }
  var options = {
    Key: key,
    Body: filename
  };
  if (publicRead) {
    options.ACL = 'public-read';
  }
  if (mimeType) {
    options.ContentType = mimeType;
  }
  s3bucket.upload(options, function(err, data) {
    if (err) {
      console.log(err);
      return dfd.reject(err);
    }
    if (!removeSourceFile) {
      return dfd.resolve(data.Location);
    }
    // Remove temp uploaded file after s3 upload
    fs.unlink(filename, function(errFS) {
      if (errFS) {
        return dfd.reject(errFS);
      }
      return dfd.resolve(key);
    });
  });
  return dfd.promise;
};


