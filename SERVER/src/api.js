
async function RouteAPI(req, res, mdb, c_user){
    var cmd = req.body.cmd || null;
    var args = req.body.args || null;
    

    const { API_Users } = require('./api_users');

    try{
        
        if(cmd === null){ 
            const { qResult } = require('./qResult');
            var rres = new qResult();
            rres.access = c_user.access_level;
            res.send(rres); 
            return true; 
        }

        // ПРОВЕРКА API ПОЛЬЗОВАТЕЛЕЙ
        if(await API_Users(cmd, args, mdb, req, res, c_user)) return true;

    }catch(e){ console.log(e); }
    return true;
}

module.exports = { RouteAPI }
