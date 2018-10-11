const ejs = require("ejs");
const loaderUtils = require("loader-utils");
const path = require("path");
const htmlmin = require("html-minifier");

const DEFAULT_OPTIONS = {
  data: {},
  exportAsDefault: false,
  exportAsEs6Default: false,
  minify: true,
  minifyOptions: {},
  ejsOptions: {}
};

const DEFAULT_EJS_OPTIONS = {
  client: true
};

const DEFAULT_MINIFY_OPTIONS = {
  removeComments: true,
  removeCommentsFromCDATA: true,
  removeCDATASectionsFromCDATA: true,
  collapseWhitespace: true,
  conservativeCollapse: true,
  removeAttributeQuotes: true,
  useShortDoctype: true,
  keepClosingSlash: true,
  minifyJS: true,
  minifyCSS: true,
  removeScriptTypeAttributes: true,
  removeStyleTypeAttributes: true
};

module.exports = function(source) {
  this.cacheable && this.cacheable();

  const options = Object.assign({}, DEFAULT_OPTIONS, loaderUtils.getOptions(this));
  const ejsOptions = Object.assign({}, DEFAULT_EJS_OPTIONS, options.ejsOptions);
  const minifyOptions = Object.assign({}, DEFAULT_MINIFY_OPTIONS, options.minifyOptions);

  let result = ejs.render(source, options.data, ejsOptions);

  if (options.minify) {
    result = htmlmin.minify(result, minifyOptions);
  }

  let prefix = "module.exports = ";
  if (options.exportAsDefault) {
    prefix = "exports.default = ";
  } else if (options.exportAsEs6Default) {
    prefix = "export default ";
  }

  return prefix + JSON.stringify(result) + ";";
};
