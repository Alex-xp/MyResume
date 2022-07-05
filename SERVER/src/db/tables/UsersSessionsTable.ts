import { BaseTable } from './BaseTable';

import pg from 'pg';
import { UserSessionEntity } from '../entityes/UserSessionEntity';

/**
 * Таблица сессий пользователей
 */
export class UsersSessionsTable extends BaseTable{
    

    /**
     * Очистить базу от старых сессий
     * @returns 
     */
    async clearOldSessions():Promise<Boolean>{
        return await this.db_conn.Exec({
            text: "DELETE FROM users_sessions WHERE expires<$1",
            values: [ new Date(Date.now()) ]
        });
    }

    /**
     * Получить сессию пользователя по ид_сессии, sha256(ид_пользователя) и sha256(ид_сессии + "-" + ид_пользователя")
     * @param sess_id 
     * @param uid_key 
     * @param sess_key 
     * @returns 
     */
    async getSession(sess_id:number, uid_key:string, sess_key:string): Promise<UserSessionEntity> {
        if(sess_id === null || uid_key === null || sess_key === null)return null;

        var s_res = await this.db_conn.QueryOne({
            text: "SELECT * FROM users_sessions WHERE id=$1 AND key_uid=$2 AND sess_key=$3",
            values: [sess_id, uid_key, sess_key]
        });

        if(s_res !== null){
            var reti = new UserSessionEntity(this.db_conn);
            reti.id = s_res.id;
            reti.uid = s_res.uid;
            reti.key_uid = s_res.key_uid;
            reti.sess_key = s_res.sess_key;
            reti.started = new Date(Date.parse(s_res.started));
            reti.expires = new Date(Date.parse(s_res.expires));
            reti.sess_data = s_res.sess_data;

            return reti;
        }
        return null;
    }

    async createSession(uid:number):Promise<UserSessionEntity>{

        var newExpires = new Date(Date.now() + (3600 * 24 * 1000)*15);

        var res_db = await this.db_conn.QueryOne({
            text:"INSERT INTO users_sessions (uid, expires) VALUES ($1, $2) RETURNING id",
            values:[uid, newExpires]
        });

        if(res_db === null || res_db.id < 1) return null;

        var sess_id:number = res_db.id;
        await this.db_conn.Exec({
            text: "UPDATE users_sessions SET key_uid=$1, sess_key=$2 WHERE id=$3",
            values:[this.db_conn.sha256(uid+""), this.db_conn.sha256(sess_id+"-"+uid), sess_id]
        });

        var sess = await this.db_conn.QueryOne({
            text:"SELECT * FROM users_sessions WHERE id=$1",
            values:[sess_id]
        });
        if(sess === null || sess.id < 1) return null;

        return new UserSessionEntity(this.db_conn, sess);
    }

    

}
