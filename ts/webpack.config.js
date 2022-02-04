// Generated using webpack-cli https://github.com/webpack/webpack-cli

const webpack = require('webpack');
const path = require("path");


const isProduction = process.env.NODE_ENV == "production";

const stylesHandler = "style-loader";

const config = {
  entry: "./src/index.ts",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "main.user.js"
  },
  optimization: {
    minimize: false,
  },
  plugins: [
    // new webpack.ContextReplacementPlugin("// UserScript", "//123123"),
    new webpack.BannerPlugin({
      banner: '// ==UserScript== \n// @name         BitReceiver Beta\n// @namespace    Nillkiz\n// @version      1.0.0\n// @homepage     https://github.com/Nillkizz/BitReceiverUS/\n// @homepageURL  https://github.com/Nillkizz/BitReceiverUS\n// @description  Receive all requests\n// @author       Nillkizz\n// @include      *://*/*\n// @icon         http://zergbit.net/static/zergbit.ico\n// @grant        GM_addElement\n// ==/UserScript==',
      raw: true
    })
    // Add your plugins here
    // Learn more about plugins from https://webpack.js.org/configuration/plugins/
  ],
  module: {
    rules: [
      {
        test: /\.html$/i,
        loader: 'raw-loader',
      },
      {
        test: /\.(ts|tsx)$/i,
        loader: "ts-loader",
        exclude: ["/node_modules/"],
      },
      {
        test: /\.css$/i,
        use: [stylesHandler, "css-loader"],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [stylesHandler, "css-loader", "sass-loader"],
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
        type: "asset",
      },

      // Add your rules for custom modules here
      // Learn more about loaders from https://webpack.js.org/loaders/
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
};

module.exports = () => {
  if (isProduction) {
    config.mode = "production";
  } else {
    config.mode = "development";
  }
  return config;
};
