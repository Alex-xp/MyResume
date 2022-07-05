import { DBConnector } from "../DBConnector";

export class BaseEntity {

    public db_conn:DBConnector = null;

    constructor(_db_conn:DBConnector){
        this.db_conn = _db_conn;
    }

}

