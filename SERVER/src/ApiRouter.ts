/**
 * АВТОРЫ: 
 *      alex-xp@list.ru Сунегин Александр
 * 
 * ОПИСАНИЕ:
 * Маршрутизация API запросов
 */

import express, { Express, Request, Response } from 'express';
import { DBConnector } from './db/DBConnector';

import { ApiResult } from './api/ApiResult';
import { getUserApi } from './api/entityes/ApiUserEntity';

import { getCurrentUser } from './db/getCurrentUser';

import { MSG_TYPES, Message, newMessage } from './api/Message';

import { ApiObject } from './api/ApiObject';


// подключаем функционал определения API (из файлов ApiCmdXxxx.ts)

import { ApiCmdUsers } from './api/ApiCmdUsers'; // работа с пользователями



export class ApiRouter{

    public app: express.Express = null;
    public db_conn:DBConnector = null;

    constructor(_app:express.Express, _db_conn:DBConnector){
        this.app = _app;
        this.db_conn = _db_conn;
    }

    public async test_messages(api_obj:ApiObject):Promise<Boolean>{
        if(api_obj.cmd === 'test_messages'){
            api_obj.result.messages.push(newMessage(MSG_TYPES.ERROR, "ERROR TEST", "ERROR TEST MESSAGE"));
            api_obj.result.messages.push(newMessage(MSG_TYPES.WARNING, "WARNING TEST", "WARNING TEST MESSAGE"));
            api_obj.result.messages.push(newMessage(MSG_TYPES.INFO, "INFO TEST", "INFO TEST MESSAGE"));
            api_obj.result.messages.push(newMessage(MSG_TYPES.SUSSCESS, "SUSSCESS TEST", "SUSSCESS TEST MESSAGE"));
            return true;
        }
        return false;
    }

    /**
     * ОПРЕДЕЛИТЕЛЬ КОМАНД API
     * @param res 
     * @param cmd 
     * @param args 
     * @param api_result 
     * @returns Promise<Boolean> true - команда совпала; false - команда не найдена
     */
    public async switchApiCmd(api_obj:ApiObject):Promise<Boolean>{
        // Обходим значения команд API. Если команда совпала и выполнена - возвращаем true

        if(await this.test_messages(api_obj)){ return true; }

        if(await ApiCmdUsers(api_obj)){ return true; }

        return false;
    }


    public route(){

        this.app.post('/api', async ( req, res)=>{

            var api_result = new ApiResult();
            api_result.user = getUserApi(await getCurrentUser(req, res, this.db_conn));

            var cmd:string = req.body.cmd;
            var args:Object = req.body.args;

            var api_obj = new ApiObject();
            api_obj.req = req;
            api_obj.res = res;
            api_obj.cmd = cmd;
            api_obj.args = args;
            api_obj.result = api_result;
            api_obj.db_conn = this.db_conn;

            // Далее обходим значения команд API. Если команда совпала и выполнена - получаем true, передаем результат и выходим
            
            if(cmd === 'current_user'){ res.send(api_result); return; }; // получить только текущего пользователя (он уже есть в api_result)

            if(await this.switchApiCmd(api_obj)){ res.send(api_result); return; }; // ВСЕ ПРОЧИЕ КОМАНДЫ ЧЕРЕЗ ОПРЕДЕЛИТЕЛЬ

            // Если команда не найдена - возвращаем ошибку
            api_result.error = `Команда "${cmd}" не найдена`;
            //res.send(api_result);
        });
        
    }

}