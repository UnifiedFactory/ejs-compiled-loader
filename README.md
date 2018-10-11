# ejs-rendered-loader for webpack

EJS loader for [webpack](http://webpack.github.io/). Uses [ejs](https://github.com/mde/ejs) function to render templates statically.

## Installation

`npm install ejs-rendered-loader`

## Options

Following options can be specified in `options`:

`data` - data to be passed into templates scopes. Default `{}`

`exportAsDefault` - exports rendered templates as `exports.default =`. Default `false`

`exportAsEs6Default` - exports rendered templates as `export default`. Default `false`

`minify` - Minifiy rendered templates with `html-minifier`. Default `true`

`minifyOptions` - Options to be passed to `html-minifier`. See `index.js` for defaults.

`ejsOptions` - options to be passed to `ejs` renderr. See `index.js` for defaults.

## License

MIT (http://www.opensource.org/licenses/mit-license.php)
