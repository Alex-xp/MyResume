const { MongoClient, ObjectId } = require("mongodb");
const mdb_client = new MongoClient("mongodb://localhost:27017/?maxPoolSize=200");

class dbClient {
    
    constructor(){
        this.mdb_client = new MongoClient("mongodb://localhost:27017");;
        this.mdb = null;
    }

    async Connect(){
        try{
            await this.mdb_client.connect();
            this.mdb = this.mdb_client.db('store_db');
        }catch(e){ console.log(e); }
        return this;
    }

    async Close(){
        try{
            await this.mdb_client.close();
        }catch(e){ console.log(e); }
        return this;
    }

    db(){
        return this.mdb;
    }


}

module.exports = { dbClient };
