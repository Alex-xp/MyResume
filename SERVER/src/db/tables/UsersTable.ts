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

    /**
     * Получить пользователя по идентификатору
     * @param user_id number - идентификатор пользователя
     * @returns Promise<UserEntity>
     */
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

    /**
     * Получить пользователя для авторизации
     * @param login string логин
     * @param password string пароль
     * @returns Promise<UserEntity>
     */
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
     * @returns Promise<Array<UserEntity>> - массив пользователей
     */
    public async findUsers(s_login:string):Promise<Array<UserEntity>>{
        
        var reti:Array<UserEntity> = await this.db_conn.Query({
            text:'SELECT * FROM users WHERE login LIKE $1 ORDER BY active DESC, u_access ASC, login ASC LIMIT 1000',
            values: ['%'+s_login+'%']
        });

        return reti;
    }

    /**
     * Установить активность выбранного пользователя
     * @param uid number идентификатор пользователя
     * @param active boolean активность
     * @returns true в лсучае успеха
     */
    public async setUserActive(uid:number, active:boolean):Promise<boolean>{
        return await this.db_conn.Exec({
            text:'UPDATE users SET active=$1 WHERE id=$2',
            values: [active, uid]
        });
    }

    /**
     * Проверка двойных логинов
     * @param uid идентификатор или 0
     * @param login проверяемый логин (не должен быть пустым)
     * @returns true - есть двойник; false - двойников нет
     */
    public async testDoubleLogin(uid:number, login:string):Promise<boolean>{
        if(login.trim().length < 1) return true;

        var db_res = await this.db_conn.Query({
            text:"SELECT 8 FROM users WHERE id<>$1 AND login=$2",
            values: [uid, login]
        });
        if(db_res.length > 0) return true;

        return false;
    }

    public async save_basic(uid:number, login:string, active:boolean, email:string, u_access:number, email_active:boolean):Promise<number>{
        if(uid>0){
            // СОХРАНЕНИЕ СУЩЕСТВУЮЩЕГО ПОЛЬЗОВАТЕЛЯ

            if(await this.db_conn.Exec({
                text:"UPDATE users SET login=$1, active=$2, email=$3, u_access=$4, email_active=$5 WHERE id=$6",
                values:[login, active, email, u_access, email_active, uid]
            })) return uid;

            return 0;
        }else{
            // ДОБАВЛЕНИЕ НОВОГО ПОЛЬЗОВАТЕЛЯ
            var db_res = await this.db_conn.QueryOne({
                text: "INSERT INTO users (login, active, email, u_access, email_active) VALUES ($1, $2, $3, $4, $5) RETURNING id",
                values:[login, active, email, u_access, email_active]
            });
            return db_res.id;
        }
        
        return 0;
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