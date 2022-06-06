

async function runServer(db) {
  const express = require('express') // подключаем express
  var cookieParser = require('cookie-parser')

  const app = express() // приложение express
  const port = 3030 // прослушиваемый порт

  //------------------------------------------------------------------------------------------------
  // СТАТИЧЕСКИЕ ФАЙЛЫ
  app.use('/public', express.static(__dirname + '/../SERVER/public'));
  app.use('/assets', express.static(__dirname + '/assets'));

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
  app.use(cookieParser())

  //------------------------------------------------------------------------------------------------
  // Подключение маршрутов

  const { route } = require('./src/router');
  route(app, db);



  //------------------------------------------------------------------------------------------------
  // запускаем express
  app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  })

}

const { MongoClient, ObjectId } = require("mongodb");

const client = new MongoClient("mongodb://localhost:27017");

async function run(){
  // СОЕДИНЕНИЕ С MONGODB
  await client.connect().catch((e)=>{ console.log(e); throw new Error(e); });

  try {
    // ТЕСТ СОЕДИНЕНИЯ
    await client.db("admin").command({ ping: 1 }).catch((e)=>{ console.log(e); throw new Error(e); });

    console.log("Connected successfully to server");
    
    // получим базу в MongoDB (для первичного наполнения данных)
    const db = client.db('store_db');

    // проверим коллекцию пользователей
    var users = db.collection("users");
    var users_count = await users.countDocuments();
    if(users_count < 1){
      const crypto = require('crypto');

      await users.insertOne({
        "_id": new ObjectId(),
        "login" : "admin",
        "access_level" : 0,
        "email" : "alex-xp@list.ru",
        "telephone" : "+7 919 588-01-66",
        "active" : true,
        "activation_code" : "",
        "remember_code" : "",
        "email_active" : true,
        "email_code" : "",
        "info" : "Разработчик",
        "password" : crypto.createHmac('sha256', 'alex-xp').update("admin").digest('hex')
      });
    }

    /*
    var users = db.collection("users");
    var users = users.find();

    console.log(users);
    */
  } finally {
    await client.close(); // ОТКЛЮЧЕНИЕ
  }

  await runServer();
}

run();

