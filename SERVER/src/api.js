
async function RouteAPI(req, res, mdb, result){
    var cmd = req.body.cmd || null;
    var args = req.body.args || null;
    

    const { API_Users } = require('./api_users');

    try{
        
        if(cmd === null){ return true;  }

        // ПРОВЕРКА API ПОЛЬЗОВАТЕЛЕЙ
        if(await API_Users(cmd, args, mdb, req, res, result)) return true;

    }catch(e){ console.log(e); }
    return true;
}

module.exports = { RouteAPI }
