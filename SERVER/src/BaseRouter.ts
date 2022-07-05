import express, { Express, Request, Response } from 'express';
import { DBConnector } from './db/DBConnector';

import { getCurrentUser } from './db/getCurrentUser';


import { UsersTable } from './db/tables/UsersTable';
import { UserEntity } from './db/entityes/UserEntity';

/**
 * МАРШРУТ И ЕГО ПАРАМЕТРЫ
 */
export class RoutePather{

    public path:string; // путь
    public js_app: string; // приложение react js, которое подключается к маршруту
    public title:string; // заголовок страницы

    public access_level:number = 99999; // предельный уровень доступа пользователя
    public no_access_js:string = null; // скрипт, который нужно запустить при отсутствии доступа

    public c_user:UserEntity = null; // Текущий пользователь в маршруте


    constructor(_path:string, _js_app:string, _title:string){
        this.path = _path;
        this.js_app = _js_app;
        this.title = _title;
    }



    // стандартная маршрутизация
    public async route(req: express.Request, res: express.Response, view:string, db_conn:DBConnector){

        this.c_user = await getCurrentUser(req, res, db_conn);
        //console.log(this.c_user);

        var user_access = this.c_user.u_access;
        
        //var ut:UsersTable = new UsersTable(db_conn);
        //var user:UserEntity = await ut.getCurrentUser(req, res);
        //var user_access = user.u_access;
        //console.log(user);
        
        // проверим пользователя
        if(this.no_access_js !== null && this.no_access_js.trim() !== ''){
            if(user_access > this.access_level){ // доступ закрыт
                res.render(view, {app: this.no_access_js, title: "Доступ к разделу закрыт"});
                return;
            }
        }

        // доступ открыт
        res.render(view, {app: this.js_app, title: this.title});
    }


}



/**
 * БАЗОВЫЙ СТАТИЧЕСКИЙ РОУТЕР
 */
export class BaseRouter{

    public app: express.Express = null;
    public db_conn:DBConnector = null;

    public layout_name:string = "index.hbs"; // имя шаблона hahdlebars
    public prefix = "/"; // начальный префикс маршрута

    // массив обрабатываемых маршрутов
    public routePathes: Array<RoutePather> = [];

    constructor(_app:express.Express, _db_conn:DBConnector){
        this.app = _app;
        this.db_conn = _db_conn;
    }

    /**
     * МАРШРУТИЗАЦИЯ
     */
    public route(){
        for(var path_index in this.routePathes){
            var pather:RoutePather = this.routePathes[path_index];
            this.app.get( this.prefix+pather.path, async (res, req) => { await pather.route(res, req, this.layout_name, this.db_conn); /* this.routeHandler(res, req, pather);*/ } );
        }
    }

}

