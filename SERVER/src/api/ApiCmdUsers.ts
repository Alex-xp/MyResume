/**
 * АВТОРЫ: 
 *      alex-xp@list.ru Сунегин Александр
 * 
 * ОПИСАНИЕ:
 * Набор API команд для работы с пользователями
 */

import { ApiObject } from './ApiObject';
import { MSG_TYPES, Message, newMessage } from '../api/Message';

import { UsersTable } from '../db/tables/UsersTable';
import { UserEntity } from '../db/entityes/UserEntity';
import { ApiUserEntity, getUserApi } from './entityes/ApiUserEntity';
import { UsersSessionsTable } from '../db/tables/UsersSessionsTable';
import { UserSessionEntity } from '../db/entityes/UserSessionEntity';

async function cmd_login(api_obj:ApiObject):Promise<void>{

    // получим пользователя по аргументам
    var login:string = api_obj.args.login || null;
    var password:string = api_obj.args.password || null;
    if(login === null || password === null){
        api_obj.result.error = `В КОМАНДЕ "${api_obj.cmd}" НЕ ДОСТАТОЧНО АРГУМЕНТОВ`;
        return;
    }
    var ut = new UsersTable(api_obj.db_conn);
    var ue:UserEntity = await ut.getUserByLogin(login, password);
    if(ue===null){
        api_obj.result.messages.push(newMessage(MSG_TYPES.ERROR, "Авторизация", "Не совпадают логин и пароль пользователя."));
        return;
    }

    // создаем сессию пользователя
    var ut_sess = new UsersSessionsTable(api_obj.db_conn);
    var sess:UserSessionEntity = await ut_sess.createSession(ue.id);
    if(sess === null){
        api_obj.result.messages.push(newMessage(MSG_TYPES.ERROR, "Авторизация", "Не могу создать сессию пользователя."));
        return;
    }

    // запишем куки сессии
    api_obj.res.cookie('key01', sess.id, {expires: sess.expires, httpOnly: true, path: '/', secure: true});
    api_obj.res.cookie('key02', sess.key_uid, {expires: sess.expires, httpOnly: true, path: '/', secure: true});
    api_obj.res.cookie('key03', sess.sess_key, {expires: sess.expires, httpOnly: true, path: '/', secure: true});

    api_obj.result.user = getUserApi(ue);
    api_obj.result.messages.push(newMessage(MSG_TYPES.SUSSCESS, "Авторизация", "Пользователь успешно авторизован."))
    return;
}

async function cmd_logout(api_obj:ApiObject):Promise<void>{
    api_obj.res.cookie('key01', "", {expires: new Date(Date.now() - 100), httpOnly: true, path: '/', secure: true});
    api_obj.res.cookie('key02', "", {expires: new Date(Date.now() - 100), httpOnly: true, path: '/', secure: true});
    api_obj.res.cookie('key03', "", {expires: new Date(Date.now() - 100), httpOnly: true, path: '/', secure: true});
    return;
}

/**
 * Поиск пользователей find_users
 * @param api_obj ApiObject - обработчик ответа API
 * @returns 
 */
async function cmd_find_users(api_obj:ApiObject):Promise<void>{

    var search_txt:string = api_obj.args.login || '';

    var reti:Array<ApiUserEntity> = [];

    var ut:UsersTable = new UsersTable(api_obj.db_conn);
    var users_db:Array<UserEntity> = await ut.findUsers(search_txt);
    
    for(var ue_ii in users_db) reti.push(getUserApi(users_db[ue_ii]));

    api_obj.result.result = reti;

    return;
}

/**
 * Сборка команд обработчиков запросов API (по тематике текущего файла)
 * @param api_obj ApiObject - обработчик ответа API
 * @returns 
 */
export async function ApiCmdUsers(api_obj:ApiObject):Promise<Boolean>{
    ///

    if(api_obj.cmd === 'login'){ await cmd_login(api_obj); return true; }
    if(api_obj.cmd === 'logout'){ await cmd_logout(api_obj); return true; }

    if(api_obj.cmd === 'find_users'){ await cmd_find_users(api_obj); return true; }


    return false;
}



