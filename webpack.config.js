/*eslint-env node */
var path = require('path');

var loaders = [
  {test: /\.js$/, loader: 'babel-loader'},
  {
    test: /\.css$/,
    exclude: /\.global\.css$/,
    loaders: [
      'style-loader?sourceMap',
      'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]',
    ],
  },
  {test: /\.global\.css$/, loader: 'style-loader!raw'},
];

module.exports = {
  entry: {
    main: './src/main.js',
  },
  output: {
    path: path.join(__dirname, 'assets'),
    publicPath: '/',
    filename: '[name].js',
  },
  module: {loaders: loaders},
};
