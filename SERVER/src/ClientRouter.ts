import express from 'express';
import { DBConnector } from './db/DBConnector';
import { BaseRouter } from './BaseRouter';

export class ClientRouter extends BaseRouter{

    constructor(_app:express.Express, _db_conn:DBConnector){
        super(_app, _db_conn);
        this.view = 'index.hbs';
    }

    public route(): void {
        this.app.get("", (req, res)=>{ this.run(req, res, "001-index", "Главная страница"); });
    }

}


