const path = require('path');
const BabiliPlugin = require('babili-webpack-plugin');

const plugins = [];

if (process.env.NODE_ENV === 'production') {
  plugins.push(new BabiliPlugin());
}

module.exports = {
  entry: './app-src/app.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      }
    ],
  },
  plugins,
};
