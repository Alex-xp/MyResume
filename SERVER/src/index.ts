import express, { Express, Request, Response } from 'express';
import cookieParser from 'cookie-parser';


import { DBConnector } from './db/DBConnector';
import { AdminRouter } from './AdminRouter';
import { ClientRouter } from './ClientRouter';
import { ApiRouter } from './ApiRouter';

import { create } from 'express-handlebars';
import { InstallRouter } from './InstallRouter';

const PORT = 3030;

const db_conn:DBConnector = new DBConnector();

const app: Express = express();
app.use(cookieParser());

app.use(express.urlencoded({extended: true})); // для заголовков форм  { 'Content-Type': 'application/x-www-form-urlencoded'}
app.use(express.json()); // для { 'Content-Type': 'application/json'}
app.use(express.text()); // для { 'Content-Type': 'text-plain'}
app.use(express.raw());

const hbs = create({ 
    partialsDir: "views/partials", // путь к частичным представлениям
    extname: ".hbs"
});
app.engine("handlebars", hbs.engine);
app.set('view engine', 'handlebars');
app.set('views', './views');

app.use('/public', express.static('./public'));



// !!!!!!! ОТКЛЮЧИТЬ В РАБОТЕ !!!!!!! - ЛУЧШЕ УДАЛИТЬ ВООБЩЕ
new InstallRouter(app, db_conn).route(); // ПЕРЕУСТАНОВЩИК ДЛЯ БАЗОВОЙ НАСТРОЙКИ И ОТЛАДКЕ





// Маршрутизация API
new ApiRouter(app, db_conn).route();


// Маршрутизация админки
new AdminRouter(app, db_conn).route();

// Маршрутизация клиентов
new ClientRouter(app, db_conn).route();





app.on('close', async ()=>{
    await db_conn.Dectroy();
});

if(db_conn.pool !== null){
    app.listen(PORT, ()=>{ console.log(`Example app listening at http://localhost:${PORT}`) });
}

