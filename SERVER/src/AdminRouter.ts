import express, { Express, Request, Response } from 'express';
import { DBConnector } from './db/DBConnector';
import { BaseRouter } from './BaseRouter';

export class AdminRouter extends BaseRouter{

    constructor(_app:express.Express, _db_conn:DBConnector){
        super(_app, _db_conn);
        this.view = 'admin.hbs';
    }

    public route(): void {

        //-----------------------------------------------------------------------------------------
        // собираем обработчики маршрутов

        this.app.get('/admin', (req, res)=>{ this.run(req, res, "002-admin_panel", "Панель управления", 100, "001-login"); });
        this.app.get('/admin/users', (req, res)=>{ this.run(req, res, "003-users", "Управление пользователями", 100, "001-login"); });
    }

}


