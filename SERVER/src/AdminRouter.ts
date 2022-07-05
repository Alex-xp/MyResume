import express, { Express, Request, Response } from 'express';
import { DBConnector } from './db/DBConnector';
import { BaseRouter, RoutePather } from './BaseRouter';

export class AdminRouter extends BaseRouter{

    constructor(_app:express.Express, _db_conn:DBConnector){
        super(_app, _db_conn);


        this.layout_name = "admin.hbs"; // имя шаблона hahdlebars
        this.prefix = "/admin"; // начальный префикс маршрута


        //-----------------------------------------------------------------------------------------
        // собираем обработчики маршрутов

        // панель администрирования
        var admin_panel:RoutePather = new RoutePather("", "002-admin_panel", "Панель управления");
        admin_panel.access_level = 100;
        admin_panel.no_access_js = "001-login";
        this.routePathes.push(admin_panel);



    }

}


