const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const webpack = require('webpack');

// plugin inits
const extractSass = new ExtractTextPlugin({
    filename: "[name].css"
});

const commonChunkOptimize = new webpack.optimize.CommonsChunkPlugin({
    name: 'common',
    filename: 'bundle.common.js',
    chunks: []
});

const uglify =   new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false,
      drop_console: false,
    }
});

module.exports = {
  entry: {
        main: './static/main.js',
        prism: './static/vendor/prism.js'
  },

  output: {
    path: path.join(__dirname, './dist/assets'),
    filename: '[name].js'
  },

  module: {
    rules: [
      {
              test: /\.(js|jsx)$/,
              use: [
                {loader:'babel-loader'}
              ],
              exclude: /node_modules/
      },
      {
            test: /\.sass$/,
            use: extractSass.extract({
                use: [{
                    loader: "css-loader",
                    options: { minimize: true }
                },
                {
                    loader: "postcss-loader"
                },
                {
                    loader: "sass-loader",
                    options: { minimize: true }
                }],
                // use style-loader in development
                fallback: "style-loader"
            })
        }
    ]
  },
  plugins: [
        commonChunkOptimize,
        extractSass,
        uglify
  ]

}
