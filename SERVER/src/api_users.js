const { ObjectId } = require("mongodb");

const crypto = require('crypto');

const { qResult } = require('./qResult');
const { UserEntity, UserEntityByObj } = require('./db/UserEntity');

function setCookies(res, exp, key01, key02, key03){
    res.cookie('key01', key01, { expires: exp, httpOnly: true, path: '', secure: true });
    res.cookie('key02', key02, { expires: exp, httpOnly: true, path: '', secure: true });
    res.cookie('key03', key03, { expires: exp, httpOnly: true, path: '', secure: true });
}
function resetCookies(res){
    setCookies(res, (new Date(Date.now() - 100)), "", "", "" );
}

async function exitUser(cmd, args, mdb, req, res, result) {
    result.result = new UserEntity();
    result.user = new UserEntity();
    try {
        var users = mdb.db().collection("users");

        var uid = req.cookies.key01 || null;
        if (uid !== null) {
            var x_u_res = UserEntityByObj(await users.findOne({ _id: ObjectId(uid.trim()) }));
            x_u_res.session = { expires: new Date(), s_id: null };
            await users.updateOne({ _id: x_u_res._id }, { $set: x_u_res });
        }

    } catch(e){
        result.error = e+"";
        console.log(e);
    }

    resetCookies(res);

    
    result.messages.push({msg_type:"INFO", text:"Пользователь вышел из системы"});
    return true;
}

// ОБЩЕДОСТУПНАЯ ФУНКЦИЯ ДЛЯ ПРОВЕРКИ ТЕКУЩЕГО ПОЛЬЗОВАТЕЛЯ ПОСЛЕ ВХОДА ПО КУКАМ
async function getCurrentUser(res, req, mdb){
    try{
        var users = mdb.db().collection("users");

        var uid = req.cookies.key01 || null;
        var key = req.cookies.key02 || null;
        if(uid===null || key===null){
            return new UserEntity();
        }

        var x_u_res = await users.findOne({ _id:ObjectId(uid.trim()), "session.s_id":ObjectId(key.trim()), "session.expires":{$gt:new Date()} });
        if(x_u_res===null){
            resetCookies(res);
            return new UserEntity();
        }else{
            //x_u_res = UserEntityByObj(x_u_res);

            // проверка ключа входа пользователя
            var k3 = crypto.createHmac('sha256', 'alex-xp').update(x_u_res._id + "" + x_u_res.session.s_id).digest('hex');
            if(k3 !== req.cookies.key03.trim()){
                return new UserEntity();
            }
            
            var newSessTime = new Date(Date.now() + 3600 * 24 * 15 * 1000);
            //var k3 = crypto.createHmac('sha256', 'alex-xp').update(x_u_res._id + "" + x_u_res.session.s_id).digest('hex');
            setCookies(res, newSessTime, x_u_res._id, x_u_res.session.s_id, k3);

            x_u_res.session.expires = newSessTime;
            await users.updateOne({ _id: x_u_res._id }, { $set: x_u_res });

        }

        return x_u_res;
    } catch(e){
        console.log(e);
    }
}



async function authUser(cmd, args, mdb, req, res, result) {
    result.result = new UserEntity();

    var a_login = args.login || null;
    var a_password = args.password || null;

    try {
        var users = mdb.db().collection("users");

        var u_res = null;

        // проверим сессию пользователя по иденитфикатору и по базе
        if (a_login === null) {
            u_res = await getCurrentUser(res, req, mdb);
        } else {
            // ВХОД ПО ЛОГИНУ И ПАРОЛЮ
            u_res = await users.findOne({ login: a_login, password: crypto.createHmac('sha256', 'alex-xp').update(a_password).digest('hex') });
            if (u_res === null) {
                result.error = "Не совпадают логин и пароль пользователя";
                result.messages.push({msg_type:"INFO", text:"Не совпадают логин и пароль пользователя"});
                resetCookies(res);
            } else {

                var newSessTime = new Date(Date.now() + 3600 * 24 * 15 * 1000);
                var u_sess = { expires: newSessTime, s_id: ObjectId() };
                u_res.session = u_sess;
                // создаем разовый ключ входа пользователя (он не изменяется на протяжении работы в пределах всей сессии)
                var k3 = crypto.createHmac('sha256', 'alex-xp').update(u_res._id + "" + u_res.session.s_id).digest('hex');

                setCookies(res, newSessTime, u_res._id, u_sess.s_id, k3);

                await users.updateOne({ _id: u_res._id }, { $set: u_res });
                
                result.messages.push({msg_type:"INFO", text:"Пользователь успешно авторизован"});
            }
        }

        if (u_res !== null) {
            result.result = u_res;
        } else {
            result.result = new UserEntity();
        }

    } catch(e){
        result.error = e+"";
        console.log(e);
    }

    return true;
}



async function API_Users(cmd, args, mdb, req, res, result){
    
    if(cmd === "auth_user"){
        try{ await authUser(cmd, args, mdb, req, res, result); }catch(e){console.log(e);}; return true;
    }else if(cmd === "exit_user"){
        try{ await exitUser(cmd, args, mdb, req, res, result); }catch(e){console.log(e);}; return true;
    }

    return false;

}

module.exports = {API_Users, getCurrentUser};
