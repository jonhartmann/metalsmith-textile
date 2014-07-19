
var basename = require('path').basename;
var debug = require('debug')('metalsmith-textile');
var dirname = require('path').dirname;
var extname = require('path').extname;
var textilejs = require('textile-js');

/**
 * Expose `plugin`.
 */

module.exports = plugin;

/**
 * Metalsmith plugin to convert markdown files.
 *`
 * @param {Object} options (optional)
 *   @property {Array} keys
 * @return {Function}
 */

function plugin(options){
  options = options || {};
  var keys = options.keys || [];

  return function(files, metalsmith, done){
    setImmediate(done);
    Object.keys(files).forEach(function(file){
      debug('checking file: %s', file);
      if (!textile(file)) return;
      var data = files[file];
      var dir = dirname(file);
      var html = basename(file, extname(file)) + '.html';
      if ('.' != dir) html = dir + '/' + html;

      debug('converting file: %s', file);
      var str = textilejs(data.contents.toString(), options);
      data.contents = new Buffer(str);
      keys.forEach(function(key) {
        data[key] = textilejs(data[key], options);
      });

      delete files[file];
      files[html] = data;
    });
  };
}

/**
 * Check if a `file` is textile.
 *
 * @param {String} file
 * @return {Boolean}
 */

function textile(file){
  return /\.textile/.test(extname(file));
}