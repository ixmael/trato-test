"use strict";

const webpack = require("webpack");
const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { VueLoaderPlugin } = require('vue-loader');
const ManifestPlugin = require('webpack-manifest-plugin');

const devMode = process.env.NODE_ENV !== 'production';

const PROJECT_PATH = process.cwd();
module.exports = {
  entry: {
    trato: path.resolve(PROJECT_PATH, "client-web", "index.js"),
    //vendors: []
  },
  output: {
    path: path.resolve(PROJECT_PATH, "public"),
    filename: "js/[name].js",
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: "/node_modules/",
        use: {
          loader:  'babel-loader'
        },
      },
      {
        test: /\.vue$/,
        exclude: "/node_modules/",
        use: {
          loader:  'vue-loader'
        },
      },
      {
        test: /\.css$/,
        use: [
          devMode ? 'vue-style-loader' : MiniCssExtractPlugin.loader,
          //MiniCssExtractPlugin.loader,
          "css-loader",
        ]
      },
    ]
  },
  plugins: [
    new ManifestPlugin(),
    new  MiniCssExtractPlugin({
      filename: devMode ? 'css/[name].css' : 'css/[name].[hash].css',
      chunkFilename: devMode ? 'css/[id].css' : 'css/[id].[hash].css',
    }),
    new VueLoaderPlugin(),
    //new webpack.ProvidePlugin({}),
    new HtmlWebpackPlugin({
      template: path.resolve(PROJECT_PATH, 'client-web', 'html.ejs'),
      inject: true,
      // minify: {
      //     collapseWhitespace: true,
      //     removeComments: true,
      //     removeRedundantAttributes: true,
      //     removeScriptTypeAttributes: true,
      //     removeStyleLinkTypeAttributes: true
      // }
    }),
  ],
  resolve: {
    extensions: [".js", ".vue", ".css"],
    modules: [
      path.resolve(PROJECT_PATH, "client-web"),
      "node_modules",
    ],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
    }
  },
};
