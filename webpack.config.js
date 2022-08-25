
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { merge } = require('webpack-merge');
const ESLintPlugin = require('eslint-webpack-plugin');

const config = {
  entry: path.resolve(__dirname, './src/index.ts'),
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, "./dist"),
  },
  plugins: [
    new ESLintPlugin({
      files: 'src/*.ts',
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './src/index.html'),
      filename: 'index.html',
    }),
    new CleanWebpackPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.ts$/i,
        enforce: 'pre',
        loader: "ts-loader",
        options: {
          configFile: 'tsconfig.json'
        }
      },
      {
        test: /\.css$/i,
        use: ['style-loader', "css-loader"],
      },
    ],
  },
  resolve: {
    extensions: ['.ts','.js'],
  },
  devServer: {
    open: true,
    host: "localhost",
  },
};

module.exports = ({ mode }) => {
  const isProd = mode === 'prod';
  const env = isProd? require('./webpack.prod.config') : require('./webpack.dev.config');
  return merge(config, env);
};
