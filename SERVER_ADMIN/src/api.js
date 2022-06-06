const { MongoClient, ObjectId } = require("mongodb");
const db_client = new MongoClient("mongodb://localhost:27017/?maxPoolSize=200");

async function apiRouter(req, res){

    var cmd = req.body.cmd || null;
    var args = req.body.args || null;
    if(cmd === null){ res.send({result:null, error:null}); return true; }

    try{
        await db_client.connect().catch((e) => { console.log(e); });
        const db = db_client.db('store_db');

        const { API_Users, getCurrentUser } = require('./api_users');

        var c_user = await getCurrentUser(res, req, db);

            

        // ПРОВЕРКА API ПОЛЬЗОВАТЕЛЕЙ
        
        if(await API_Users(cmd, args, db, req, res, c_user)) return true;



    }finally{
        await db_client.close();
        return true;
    }
}

module.exports = { apiRouter } 
