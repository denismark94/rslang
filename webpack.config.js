
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { merge } = require('webpack-merge');
const ESLintPlugin = require('eslint-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

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
      favicon: './assets/icons/favicon.ico',
      filename: 'index.html',
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({ filename: '[name].css' }),
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
        test: /\.(?:gif|png|jpg|jpeg)$/i,
        type: 'asset/resource',
        generator: {
        filename: 'assets/images/[name][ext]'
        },
      },
      {
        test: /\.(?:ico|svg)$/,
        type: 'asset/resource',
        generator: {
        filename: 'assets/icons/[name][ext]'
        },
      },
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
      }
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
