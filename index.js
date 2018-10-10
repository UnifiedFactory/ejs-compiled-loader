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

module.exports = function(source) {
  this.cacheable && this.cacheable();

  const options = Object.assign({}, DEFAULT_OPTIONS, loaderUtils.getOptions(this));
  const ejsOptions = Object.assign({}, DEFAULT_EJS_OPTIONS, options.ejsOptions);
  const minifyOptions = Object.assign({}, options.minifyOptions);

  let result = ejs.render(source, options.data, ejsOptions);

  if (options.minify) {
    [
      "removeComments",
      "removeCommentsFromCDATA",
      "removeCDATASectionsFromCDATA",
      "collapseWhitespace",
      "conservativeCollapse",
      "removeAttributeQuotes",
      "useShortDoctype",
      "keepClosingSlash",
      "minifyJS",
      "minifyCSS",
      "removeScriptTypeAttributes",
      "removeStyleTypeAttributes"
    ].forEach(function(name) {
      if (typeof minifyOptions[name] === "undefined") {
        minifyOptions[name] = true;
      }
    });

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
