const ejsRenderedLoader = require.resolve("../index");

module.exports = {
  entry: "./app.js",

  output: {
    path: __dirname,
    filename: "bundle.js"
  },

  module: {
    rules: [
      {
        test: /simple\.ejs$/,
        loader: ejsRenderedLoader,
        options: {
          data: {
            hobby: "simple"
          },
          minify: false
        }
      },
      {
        test: /minified\.ejs$/,
        loader: ejsRenderedLoader,
        options: {
          data: {
            hobby: "minified"
          },
          minify: true
        }
      },
      {
        test: /es6export\.ejs$/,
        loader: ejsRenderedLoader,
        options: {
          data: {
            hobby: "es6"
          },
          minify: true,
          exportAsEs6Default: true
        }
      }
    ]
  }
};
