/**
 * АВТОРЫ: 
 *      alex-xp@list.ru Сунегин Александр
 * 
 * ОПИСАНИЕ:
 * Базовый роутер страниц приложения
 */

import express from 'express';
import { DBConnector } from './db/DBConnector';

import { getCurrentUser } from './db/getCurrentUser';

/**
 * БАЗОВЫЙ СТАТИЧЕСКИЙ РОУТЕР
 */
export class BaseRouter{

    public app: express.Express = null;
    public db_conn:DBConnector = null;

    public view:string = 'index.hbs'; // шаблон - обычно единый на маршрутизатор (это раздел)

    constructor(_app:express.Express, _db_conn:DBConnector){
        this.app = _app;
        this.db_conn = _db_conn;
    }

    /**
     * ИСПОЛНЕНИЕ МАРШРУТА
     * @param req Request
     * @param res Response
     * @param _js_app приложение на ReactJS
     * @param _title заголовок
     * @param access уровень доступа (по умолчанию 99999)
     * @param no_access_js приложение на ReactJS - при отсутствии доступа пользователя к данной странице
     */
    public async run(req: express.Request, res: express.Response, _js_app:string, _title:string, access:number=99999, no_access_js:string=null){

        // получим текущего пользователя и его уровень доступа
        var c_user = await getCurrentUser(req, res, this.db_conn);
        var user_access = c_user.u_access;
    
        // проверим пользователя
        if(no_access_js !== null && no_access_js.trim() !== ''){
            if(user_access > access){ // доступ закрыт
                res.render(this.view, {app: no_access_js, title: "Доступ к разделу закрыт"});
                return;
            }
        }

        // доступ открыт
        res.render(this.view, {app: _js_app, title: _title});
    }



    /**
     * МАРШРУТИЗАЦИЯ
     */
    public route():void{}

}

