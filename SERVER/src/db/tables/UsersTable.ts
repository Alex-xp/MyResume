/**
 * АВТОРЫ: 
 *      alex-xp@list.ru Сунегин Александр
 * 
 * ОПИСАНИЕ:
 * Работа с таблицей пользователей
 */

import { BaseTable } from './BaseTable';
import { UserEntity } from "../entityes/UserEntity";

import pg from 'pg';


// Единственная модель таблицы где должен в открытую применяться экспресс сервер (пользователи и куки)
import express from 'express';


export class UsersTable extends BaseTable{

    async getUserById(user_id:number):Promise<UserEntity>{
        var u = await this.db_conn.QueryOne({
            text: "SELECT * FROM users WHERE id=$1",
            values: [user_id]
        });

        if(u===null) return null;

        var reti:UserEntity = new UserEntity(this.db_conn);
        reti.id = u.id;
        reti.login = u.login;
        reti.password = u.password;
        reti.u_access= u.u_access;
	    reti.user_data = u.user_data;
	    reti.active = u.active;
	    reti.activation_code = u.activation_code;
	    reti.remember_code = u.remember_code;
	    reti.email = u.email;
	    reti.email_active = u.email_active;
	    reti.email_code = u.email_code;
        return reti;
    }

    public async getUserByLogin(login:string, password:string):Promise<UserEntity>{
        
        var db_res:pg.QueryResult = await this.db_conn.QueryOne({
            text:"SELECT * FROM users WHERE login=$1 AND password=$2",
            values: [login, this.db_conn.sha256(password)]
        });
        if(db_res === null){
            return null;
        }

        return new UserEntity(this.db_conn, db_res);
    }

    /**
     * Поиск пользователей по логину
     * @param s_login string - строка поиска
     * @returns 
     */
    public async findUsers(s_login:string):Promise<Array<UserEntity>>{
        
        var reti:Array<UserEntity> = await this.db_conn.Query({
            text:'SELECT * FROM users WHERE login LIKE $1',
            values: ['%'+s_login+'%']
        });

        return reti;
    }


    /*
    public async getCurrentUser(req: express.Request, res: express.Response):Promise<UserEntity>{

        // Получим куки пользователя


        var cl:pg.PoolClient = await this._beginQuery();

        //var db_res:pg.QueryResult = await cl.query("")

        await this._endQuery(cl);

        return new UserEntity(this.db_conn);
    }
    */


}