var PAGE = "login_form";
var OUT_DIR = "../../../../public/app/user/"+PAGE+"/";
var OUT_FILENAME = "app.js";


var path = require('path');
module.exports = {
    entry: "../../../src/pages/user/"+PAGE+"/main.jsx",
    //mode: "production",
    output: {
        path: path.resolve(__dirname, OUT_DIR),     // путь к каталогу выходных файлов - папка public
        publicPath: OUT_DIR,
        filename: OUT_FILENAME       // название создаваемого файла
    },
    module: {
        rules: [   //загрузчик для jsx
            {
                test: /\.jsx?$/, // определяем тип файлов
                exclude: /(node_modules)/,  // исключаем из обработки папку node_modules
                loader: "babel-loader",   // определяем загрузчик
                options: {
                    presets: ["@babel/preset-env", "@babel/preset-react"]    // используемые плагины
                }
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
        extensions: ['.js', '.jsx'],
    }

}
