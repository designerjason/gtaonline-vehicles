const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { VueLoaderPlugin } = require('vue-loader')

module.exports = {
  mode: 'production',
  entry: './src/js/main.js',
  output: {
    path: path.resolve(__dirname, "/docs"),
    publicPath: './',
    filename: 'js/bundle.min.js'
  },
  devServer: {
    static: {
      directory: path.join(__dirname, "docs")
    }
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
      },
      {
        test: /\.scss$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader
          },
          'css-loader',
          'postcss-loader',
          'sass-loader'
        ]
      }
    ]
    },
  plugins: [
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      title: 'GTA Online Vehicles List',
      template: './src/pageTemplate.html',
      filename: 'index.html'
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name].css'
    })
  ]
}
