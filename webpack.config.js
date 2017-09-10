const path = require('path');

module.exports = {
  entry: "./frontend/welcome.js",
  devtool: "source-map",
  output: {
    path: path.resolve(__dirname),
    filename: 'bundle.js'
  }
};
