const path = require('path')
const { VueLoaderPlugin } = require('vue-loader')

module.exports = {
  mode: 'production',
  entry: './src/js/main.js',
  output: {
    filename: 'bundle.min.js',
    path: path.resolve(__dirname, 'docs/js')
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
          use: [
            {
              loader: 'vue-loader'
            }
          ]
      },
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
    },
    plugins: [
      new VueLoaderPlugin()
    ]
}
