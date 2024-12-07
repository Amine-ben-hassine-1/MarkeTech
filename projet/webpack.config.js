const path = require('path');
const webpack = require('webpack');

module.exports = {
  mode: 'development', // or 'production'
  entry: './src/index.js', // the entry point of your application
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  resolve: {
    fallback: {
      "http": require.resolve("stream-http"),
      "https": require.resolve("https-browserify"),
      "util": require.resolve("util/"),
      "stream": require.resolve("stream-browserify"),
      "url": require.resolve("url/"),
      "assert": require.resolve("assert/"),
      "zlib": require.resolve("browserify-zlib")
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
    }),
  ],
};
