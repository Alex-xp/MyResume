import express from 'express';
import { DBConnector } from './db/DBConnector';

import fs from 'fs';
import path from 'path';


export class InstallRouter {

    public app: express.Express = null;
    public db_conn:DBConnector = null;

    constructor(_app:express.Express, _db_conn:DBConnector){
        this.app = _app;
        this.db_conn = _db_conn;
    }

    public route(){

        this.app.get( '/install', async (req: express.Request, res: express.Response) => { 
            res.render("install/install_001.hbs", { app: "install_01"});
        });

        this.app.get( '/install/002', async (req: express.Request, res: express.Response) => { 

            //console.log(path.normalize( path.join(__dirname, "..", "sql", "users.sql")));

            var users_table = fs.readFileSync(path.normalize( path.join(__dirname, "..", "sql", "users.sql")), {encoding:'utf-8'});
            await this.db_conn.Exec({text:users_table});

            await this.db_conn.Exec({
                text: "INSERT INTO users (login, password, u_access, user_data, active, email, email_active)VALUES ($1, $2, $3, $4, $5, $6, $7);",
                values: [ 'admin', this.db_conn.sha256('admin'), 0, {}, true, 'admin@admin.ru', true ]
            });

            var users_sessions_table = fs.readFileSync(path.normalize( path.join(__dirname, "..", "sql", "users_sessions.sql")), {encoding:'utf-8'});
            await this.db_conn.Exec({text:users_sessions_table});


            res.render("install/install_002.hbs", { app: "install_01"});
        });



    }

} 
