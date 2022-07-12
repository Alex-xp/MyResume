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
 * @param api_obj api_obj.args => { search_txt: login_search_text }
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
 * Установить активность пользователя
 * @param api_obj api_obj.args => { id:user_id, active:boolean }
 * @returns 
 */
async function set_user_activation(api_obj:ApiObject):Promise<boolean>{
    var uid:number = api_obj.args.id || 0;
    var act:boolean = api_obj.args.active || false;
    if(uid===0)return;

    var ut:UsersTable = new UsersTable(api_obj.db_conn);
    return await ut.setUserActive(uid, act);
}


/**
 * Проверка двойных логинов
 * @param api_obj api_obj.args => { id:user_id, login:string }
 * @returns 
 */
async function test_user_double(api_obj:ApiObject):Promise<boolean>{

    var uid:number = api_obj.args.id || 0;
    var login:string = api_obj.args.login || '';
    if(uid===0) return true;
    if(login.trim() === '') return true;

    var ut:UsersTable = new UsersTable(api_obj.db_conn);
    var reti:boolean = await ut.testDoubleLogin(uid, login);
    api_obj.result.result = reti;
    return reti;
}



/**
 * Базовое сохранение пользователя (применимо для создания и сохранения базовых значений о пользователе)
 * @param api_obj api_obj.args => { id:user_id, login:string, email:string, active:boolean, u_access:number, email_active:boolean }
 * @returns 
 */
async function save_user(api_obj:ApiObject):Promise<boolean>{

    var uid:number = api_obj.args.id || 0;
    var login:string = api_obj.args.login || '';
    var email:string = api_obj.args.email || '';
    var active:boolean = api_obj.args.active || false;
    var u_access:number = api_obj.args.u_access || 10000;
    var email_active:boolean = api_obj.args.email_active || false;
    //var activation_code:string = api_obj.args.activation_code || '';
    //var remember_code:string = api_obj.args.remember_code || '';
    //var email_code:string = api_obj.args.email_code || '';
    //var user_data:Object = api_obj.args.user_data || {};

    api_obj.result.result = 0;
    if(login.trim().length < 6) return false;

    var ut:UsersTable = new UsersTable(api_obj.db_conn);
    var ret_uid = await ut.save_basic(uid, login, active, email, u_access, email_active);
    if(ret_uid > 0) {
        api_obj.result.result = ret_uid;
        api_obj.result.messages.push(newMessage(MSG_TYPES.SUSSCESS, "Сохранение пользователя", `Пользователь "${login}" успешно сохранен`));
        return true;
    }

    api_obj.result.messages.push(newMessage(MSG_TYPES.ERROR, "Сохранение пользователя", "Не могу сохранить пользователя"))
    return false;
}

/**
 * Изменение пароля пользователя
 * @param api_obj api_obj.args => { id:user_id, password:string }
 * @returns 
 */
async function set_password(api_obj:ApiObject):Promise<boolean>{
    var uid:number = api_obj.args.id || 0;
    var password:string = api_obj.args.password || '';

    if(uid===0 && password.trim() === ''){
        api_obj.result.messages.push(newMessage(MSG_TYPES.ERROR, "Изменение пароля", "Не верно передан пользователь или пароль"))
        return false;
    }

    var ut:UsersTable = new UsersTable(api_obj.db_conn);
    var q_ret = await ut.set_password(uid, password);
    api_obj.result.result = q_ret;
    if(q_ret){
        api_obj.result.messages.push(newMessage(MSG_TYPES.SUSSCESS, "Изменение пароля", `Новый пароль успешно сохранен`));
    }else{
        api_obj.result.messages.push(newMessage(MSG_TYPES.ERROR, "Изменение пароля", "Не могу сохранить пароль"))
    }

    return q_ret;
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
    
    if(api_obj.cmd === 'set_user_activation'){ await set_user_activation(api_obj); return true; }

    if(api_obj.cmd === 'test_user_double'){ await test_user_double(api_obj); return true; }

    if(api_obj.cmd === 'save_user'){ await save_user(api_obj); return true; }

    if(api_obj.cmd === 'set_password'){ await set_password(api_obj); return true; }


    return false;
}



