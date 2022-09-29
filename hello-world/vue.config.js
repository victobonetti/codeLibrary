// Inside the vue.config.js file
const path = require("path");
module.exports = {
  outputDir: path.resolve(__dirname, '../dist'),
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:8080/'
      }
    }
  }
}


