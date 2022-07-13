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
        return new UserEntity(this.db_conn, u);
    }

    /**
     * Получить пользователя для авторизации
     * @param login string логин
     * @param password string пароль
     * @returns Promise<UserEntity>
     */
    public async getUserByAuth(login:string, password:string):Promise<UserEntity>{

        var db_res:pg.QueryResult = await this.db_conn.QueryOne({
            text: "SELECT * FROM get_user_auth($1, $2)",
            values: [login, this.db_conn.sha256(password)]
        });
        if(db_res === null){
            return null;
        }
        return new UserEntity(this.db_conn, db_res);
    }

    /**
     * Базовое сохранение пользователя (применимо для создания и сохранения базовых значений о пользователе)
     * @param uid 
     * @param login 
     * @param active 
     * @param email 
     * @param u_access 
     * @param email_active 
     * @returns 
     */
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

    public async set_password(uid:number, password:string):Promise<boolean>{
        if(password.trim().length < 8) return false;

        var sha_passw = this.db_conn.sha256(password.trim());

        return await this.db_conn.Exec({
            text: "UPDATE users SET password=$1 WHERE id=$2",
            values: [sha_passw,  uid]
        });
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