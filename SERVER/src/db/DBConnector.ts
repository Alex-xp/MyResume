/**
 * АВТОРЫ: 
 *      alex-xp@list.ru Сунегин Александр
 * 
 * ОПИСАНИЕ:
 * Подключение и основные обработчики БД PostgreSQL
 */

import pg from 'pg';

import crypto from 'crypto';

/**
 * ПОДКЛЮЧЕНИЕ К БАЗЕ ДАННЫХ
 */
export class DBConnector{

    private CRYPTO_KEY = 'alex-xp';


    /** Пул соединениий */
    public pool:pg.Pool = null;


    /** ПОДКЛЮЧЕНИЕ И НАЧАЛО РАБОТЫ С БАЗОЙ ДАННЫХ */
    constructor(){
        try{ 
            this.pool = new pg.Pool({
                user: 'postgres',
                host: 'localhost',
                database: 'site_xdata',
                password: '000000',
                port: 5432,
            });
        }catch(error){
            console.log(error);
            this.pool = null;
        }
    }


    /**
     * Получить клиента из пула для обработки запросов
     * @returns 
     */
    async begin():Promise<pg.PoolClient>{
        try{ return await this.pool.connect(); }catch(error){ console.log(error); return null; }
    }


    /**
     * Высвободить клиента
     * @returns true - удачно, false - произошла ошибка
     */
    async end(client:pg.PoolClient):Promise<Boolean>{
        try{ await client.release(); }catch(error){ console.log(error); return false; }
        return true;
    }


    /**
     * Полное завершение работы с базой
     * @returns true - удачно, false - произошла ошибка
     */
    async Dectroy():Promise<Boolean>{
        try{ await this.pool.end(); }catch(error){ console.log(error); return false; }
        return true;
    }

    async Exec(q:any):Promise<Boolean>{
        try{
            var cl:pg.PoolClient = await this.begin();
            await cl.query(q);
            await this.end(cl);
            return true;
        } catch(e){ console.log(e); return false; }
    }

    /**
     * Выполнить запрос в базу данных с возвратом значений в виде строк
     * @param q 
     * @returns 
     */
    async Query(q:any):Promise<Array<any>>{
        try{
            var cl:pg.PoolClient = await this.begin();
            var q_res:pg.QueryResult = await cl.query(q);

            var reti:Array<any> = [];
            for(var row_ii in q_res.rows) reti.push(q_res.rows[row_ii])

            await this.end(cl);
            return reti;
        } catch(e){ console.log(e); return []; }
    }

    /**
     * Выполнить запрос в базу данных с возвратом значений в виде единственной строки
     * @param q 
     * @returns 
     */
    async QueryOne(q:any):Promise<any>{
        try{
            var q_res:Array<any> = await this.Query(q);
            if(q_res.length > 0) return q_res[0];
            return null;
        } catch(e){ console.log(e); return null; }
    }


    public sha256(str:string):string{
        return crypto.createHmac('sha256', this.CRYPTO_KEY).update(str).digest('hex');
    }



}

