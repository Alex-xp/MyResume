

async function runServer() {
  const express = require('express') // подключаем express

  const app = express() // приложение express
  const port = 3000 // прослушиваемый порт

  //------------------------------------------------------------------------------------------------
  // СТАТИЧЕСКИЕ ФАЙЛЫ
  app.use('/public', express.static(__dirname + '/public'));

  //------------------------------------------------------------------------------------------------
  // ПОДКЛЮЧАЕМ ШАБЛОНИЗАТОР Handlebars
  var hbs = require('hbs');
  const async = require('hbs/lib/async');
  app.set('view engine', 'hbs');

  app.set('views', __dirname + '/views'); // путь к шаблонам
  hbs.registerPartials(__dirname + "/views/partials"); // путь к частичным представлениям

  //------------------------------------------------------------------------------------------------
  // парсер POST запросов (работает с body-parser)
  app.use(express.urlencoded({ extended: true })); // для заголовков форм  { 'Content-Type': 'application/x-www-form-urlencoded'}
  app.use(express.json()); // для { 'Content-Type': 'application/json'}
  app.use(express.text()); // для { 'Content-Type': 'text-plain'}
  app.use(express.raw());

  //------------------------------------------------------------------------------------------------
  // парсер куков
  var cookieParser = require('cookie-parser')
  app.use(cookieParser())

  //------------------------------------------------------------------------------------------------
  // Подключение маршрутов

  const { route } = require('./src/router');
  route(app);



  //------------------------------------------------------------------------------------------------
  // запускаем express
  app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  })

}

runServer();

