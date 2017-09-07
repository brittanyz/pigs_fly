const path = require('path');

module.exports = {
  entry: "./game.js",
  devtool: "source-map",
  output: {
    path: path.resolve(__dirname),
    filename: 'bundle.js'
  }
};
