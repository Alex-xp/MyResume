var OUT_DIR = "../../../../SERVER/public/admin/"

var OUT_FILENAME = "002-admin_panel.js"


var path = require('path');
module.exports = {
    entry: "./src/.index.tsx",
    module: {
        rules: [   //загрузчик для tsx
            {
              test: /\.tsx?$/,
              use: 'ts-loader',
              exclude: /node_modules/,
            },


            { // SASS
              test: /\.s[ac]ss$/i,
              use: [
                // Загрузчик стилей в строку JS
                "style-loader",
                // Трансляция CSS по типу CommonJS
                "css-loader",
                // Компиляция Sass в CSS
                "sass-loader",
              ],
            },
            { // SVG
              test: /\.svg$/,
              use: ['@svgr/webpack'],
            },/*
            {
              test: /\.svg$/,
              loader: 'svg-inline-loader'
            },*/
            { // FILE-LOADER
              test: /\.(eot|woff|ttf)$/i, /* test: /\.(png|jpe?g|gif|eot|woff|ttf)$/i, */
              use: [
                {
                  loader: 'file-loader',
                },
              ],
            }
        ]
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js'],
    },
    output: {
      filename: OUT_FILENAME,
      path: path.resolve(__dirname, OUT_DIR),
    },

}
