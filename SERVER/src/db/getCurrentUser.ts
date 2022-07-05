import express, { Express, Request, Response } from 'express';
import { DBConnector } from './DBConnector';

import { UsersTable } from './tables/UsersTable';
import { UserEntity } from "./entityes/UserEntity";

import { UsersSessionsTable } from './tables/UsersSessionsTable';
import { UserSessionEntity } from './entityes/UserSessionEntity';

/**
 * Получить сессию пользователя
 * @param db_conn 
 * @param sess_id 
 * @param uid_key 
 * @param sess_key 
 * @returns 
 */
async function _getSession(db_conn:DBConnector, sess_id:number, uid_key:string, sess_key:string):Promise<UserSessionEntity>{
    if(sess_id === null || uid_key === null || sess_key === null)return null;
    
    var st:UsersSessionsTable = new UsersSessionsTable(db_conn);
    await st.clearOldSessions();

    return await st.getSession(sess_id, uid_key, sess_key);
}

/**
 * Обновить время жизни сессии
 * @param sess 
 * @param res 
 * @param sess_id 
 * @param uid_key 
 * @param sess_key 
 */
async function _updateSession(sess:UserSessionEntity, res:express.Response, sess_id:number, uid_key:string, sess_key:string) {
    var exp = new Date(Date.now() + 3600 * 24 * 15 * 1000);
    res.cookie("key01", sess_id, {expires: exp, httpOnly: true, path: '', secure: true});
    res.cookie("key02", uid_key, {expires: exp, httpOnly: true, path: '', secure: true});
    res.cookie("key03", sess_key, {expires: exp, httpOnly: true, path: '', secure: true});

    await sess.updateExpires(exp);
}

/**
 * Очистить сессию
 * @param res 
 */
function _clearSession(res:express.Response) {
    var exp = new Date(Date.now() -100);
    res.cookie("key01", "", {expires: exp, httpOnly: true, path: '', secure: true});
    res.cookie("key02", "", {expires: exp, httpOnly: true, path: '', secure: true});
    res.cookie("key03", "", {expires: exp, httpOnly: true, path: '', secure: true});
}


/**
 * Получить текущего пользователя
 * @param req 
 * @param res 
 * @param db_conn 
 * @returns 
 */
export async function getCurrentUser(req: express.Request, res: express.Response, db_conn:DBConnector):Promise<UserEntity>{
    var reti:UserEntity = new UserEntity(db_conn);

    // Проверим наличие ключей сессии
    var key01 = req.cookies["key01"] || null; // id сессии
    var key02 = req.cookies["key02"] || null; // sha256(user.id)
    var key03 = req.cookies["key03"] || null; // sess_key из таблицы users_sessions sha256(session.id + "-" + user.id)

    var sess:UserSessionEntity = await _getSession(db_conn, key01, key02, key03);
    if(sess !== null){
        // сессия найдена - пробуем найти пользователя
        var user_id:number = sess.uid;
        var ut:UsersTable = new UsersTable(db_conn);
        var user:UserEntity = await ut.getUserById(user_id);
        if(user === null) { 
            // пользователь не найден
            _clearSession(res);
            return reti;
        }

        // пользователь найден
        await _updateSession(sess, res, key01, key02, key03);
        return user; 
    }else{
        // сессия не найдена - вернем гостевого пользователя
        _clearSession(res);
        return reti;
    }
}


