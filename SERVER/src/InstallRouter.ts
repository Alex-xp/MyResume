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
            await this.db_conn.Exec({ text: fs.readFileSync(path.normalize( path.join(__dirname, "..", "sql", "functions_start.sql")), {encoding:'utf-8'}) });




            await this.db_conn.Exec({ text: fs.readFileSync(path.normalize( path.join(__dirname, "..", "sql", "users_groups.sql")), {encoding:'utf-8'}) });

            await this.db_conn.Exec({ text: fs.readFileSync(path.normalize( path.join(__dirname, "..", "sql", "users.sql")), {encoding:'utf-8'}) });
            await this.db_conn.Exec({
                text: "INSERT INTO users (login, password, u_access, user_data, active, email, email_active, group_id)VALUES ($1, $2, $3, $4, $5, $6, $7, $8);",
                values: [ 'admin', this.db_conn.sha256('admin'), 0, {}, true, 'admin@admin.ru', true, 1 ]
            });

            await this.db_conn.Exec({ text: fs.readFileSync(path.normalize( path.join(__dirname, "..", "sql", "users_sessions.sql")), {encoding:'utf-8'}) });




            await this.db_conn.Exec({ text: fs.readFileSync(path.normalize( path.join(__dirname, "..", "sql", "functions_end.sql")), {encoding:'utf-8'}) });
            res.render("install/install_002.hbs", { app: "install_01"});
        });



    }

} 
