import { DBConnector } from "../DBConnector";
import pg from 'pg';

export class BaseTable{
    public db_conn:DBConnector = null;

    constructor(_db_conn:DBConnector){
        this.db_conn = _db_conn;
    }

    
    /**
     * Начало запроса (получить клиента для запроса)
     * @returns 
     */
    public async _beginQuery():Promise<pg.PoolClient>{
        return await this.db_conn.begin();
    }



    /**
     * Завершить запрос - высвободить клиента
     * @param cl 
     * @returns 
     */
    public async _endQuery(cl:pg.PoolClient):Promise<Boolean>{
        try{
            await this.db_conn.end(cl);
            return true;
        }catch(e){
            console.log(e);
            return false;
        }
    }


}
