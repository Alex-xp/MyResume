import express, { Express, Request, Response } from 'express';
import { DBConnector } from './db/DBConnector';
import { BaseRouter, RoutePather } from './BaseRouter';

export class ClientRouter extends BaseRouter{

    constructor(_app:express.Express, _db_conn:DBConnector){
        super(_app, _db_conn);


        this.layout_name = "index.hbs"; // имя шаблона hahdlebars
        this.prefix = "/"; // начальный префикс маршрута


        //-----------------------------------------------------------------------------------------
        // собираем обработчики маршрутов

        // панель администрирования
        var admin_panel:RoutePather = new RoutePather("", "001-index", "Главная страница");
        this.routePathes.push(admin_panel);



    }

}


