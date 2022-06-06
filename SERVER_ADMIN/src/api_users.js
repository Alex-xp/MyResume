const { ObjectId } = require("mongodb");


const crypto = require('crypto');

const { qResult } = require('./qResult');

async function exitUser(cmd, args, db, req, res, c_user) {
    var reti = new qResult();
    reti.result = { _id: null, login: "", access_level: 99999, info: "Гость", active: true, session: {} };
    reti.access = 99999;
    try {
        var users = db.collection("users");

        var uid = req.cookies.key01 || null;
        if (uid !== null) {
            var x_u_res = await users.findOne({ _id: ObjectId(uid.trim()) });
            x_u_res.session = { expires: new Date(), s_id: null };
            await users.updateOne({ _id: x_u_res._id }, { $set: x_u_res });
        }

    } catch(e){
        console.log(e);
    }
    res.cookie('key01', "", { expires: new Date(Date.now() - 100), httpOnly: true, path: '', secure: true });
    res.cookie('key02', "", { expires: new Date(Date.now() - 100), httpOnly: true, path: '', secure: true });
    res.cookie('key03', "", { expires: new Date(Date.now() - 100), httpOnly: true, path: '', secure: true });
    res.send(reti);

}

// ОБЩЕДОСТУПНАЯ ФУНКЦИЯ ДЛЯ ПРОВЕРКИ ТЕКУЩЕГО ПОЛЬЗОВАТЕЛЯ ПОСЛЕ ВХОДА ПО КУКАМ
async function getCurrentUser(res, req, db){
    try{
        var users = db.collection("users");

        var uid = req.cookies.key01 || null;
        var key = req.cookies.key02 || null;
        if(uid===null || key===null){
            return { _id:null, login:"", access_level:99999, info:"Гость", active:true, session:{} };
        }

        var x_u_res = await users.findOne({ _id:ObjectId(uid.trim()), "session.s_id":ObjectId(key.trim()), "session.expires":{$gt:new Date()} });
        if(x_u_res===null){
            res.cookie('key01', "", { expires: new Date(Date.now() - 100), httpOnly: true, path: '', secure: true });
            res.cookie('key02', "", { expires: new Date(Date.now() - 100), httpOnly: true, path: '', secure: true });
            res.cookie('key03', "", { expires: new Date(Date.now() - 100), httpOnly: true, path: '', secure: true });
            return { _id:null, login:"", access_level:99999, info:"Гость", active:true, session:{} };
        }else{

            // проверка ключа входа пользователя
            var k3 = crypto.createHmac('sha256', 'alex-xp').update(x_u_res._id + "" + x_u_res.session.s_id).digest('hex');
            if(k3 !== req.cookies.key03.trim()){
                res.cookie('key01', "", { expires: new Date(Date.now() - 100), httpOnly: true, path: '', secure: true });
                res.cookie('key02', "", { expires: new Date(Date.now() - 100), httpOnly: true, path: '', secure: true });
                res.cookie('key03', "", { expires: new Date(Date.now() - 100), httpOnly: true, path: '', secure: true });
                return { _id:null, login:"", access_level:99999, info:"Гость", active:true, session:{} };
            }
            
            var newSessTime = new Date(Date.now() + 3600 * 24 * 15 * 1000);
            res.cookie('key01', x_u_res._id, { expires: newSessTime, httpOnly: true, path: '', secure: true });
            res.cookie('key02', x_u_res.session.s_id, { expires: newSessTime, httpOnly: true, path: '', secure: true });
            //var k3 = crypto.createHmac('sha256', 'alex-xp').update(x_u_res._id + "" + x_u_res.session.s_id).digest('hex');
            res.cookie('key03', req.cookies.key03.trim(), { expires: newSessTime, httpOnly: true, path: '', secure: true });
            x_u_res.session.expires = newSessTime;
            await users.updateOne({ _id: x_u_res._id }, { $set: x_u_res });

        }

        return x_u_res;
    }finally{
        //
    }
}



async function authUser(cmd, args, db, req, res, c_user) {
    var reti = new qResult();
    reti.result = { _id: null, login: "", access_level: 99999, info: "Гость", active: true, session: {} };
    reti.access = 99999;

    var a_login = args.login || null;
    var a_password = args.password || null;

    try {
        var users = db.collection("users");

        var u_res = null;

        // проверим сессию пользователя по иденитфикатору и по базе
        if (a_login === null) {
            u_res = await getCurrentUser(res, req, db);
        } else {
            // ВХОД ПО ЛОГИНУ И ПАРОЛЮ
            u_res = await users.findOne({ login: a_login, password: crypto.createHmac('sha256', 'alex-xp').update(a_password).digest('hex') });
            if (u_res === null) {
                reti.error = "Не совпадают логин и пароль пользователя";
                res.cookie('key01', "", { expires: new Date(Date.now() - 100), httpOnly: true, path: '', secure: true });
                res.cookie('key02', "", { expires: new Date(Date.now() - 100), httpOnly: true, path: '', secure: true });
                res.cookie('key03', "", { expires: new Date(Date.now() - 100), httpOnly: true, path: '', secure: true });
            } else {
                var newSessTime = new Date(Date.now() + 3600 * 24 * 15 * 1000);
                var u_sess = { expires: newSessTime, s_id: ObjectId() };
                u_res.session = u_sess;
                res.cookie('key01', u_res._id, { expires: newSessTime, httpOnly: true, path: '', secure: true });
                res.cookie('key02', u_sess.s_id, { expires: newSessTime, httpOnly: true, path: '', secure: true });

                // создаем разовый ключ входа пользователя (он не изменяется на протяжении работы в пределах всей сессии)
                var k3 = crypto.createHmac('sha256', 'alex-xp').update(u_res._id + "" + u_res.session.s_id).digest('hex');
                res.cookie('key03', k3, { expires: newSessTime, httpOnly: true, path: '', secure: true });

                await users.updateOne({ _id: u_res._id }, { $set: u_res });
            }
        }

        if (u_res !== null) {
            reti.result = u_res;
        } else {
            reti.result = { _id: null, login: "", access_level: 99999, info: "Гость", active: true, session: {} };
        }


    } catch(e){
        console.log(e);
    }

    reti.access = reti.result.access_level;
    res.send(reti);

}



/** 
 * ПОЛУЧИТЬ ПОЛЬЗОВАТЕЛЕЙ
 */
async function getUsers(cmd, args, db, req, res, c_user) {
    var reti = new qResult(); reti.result = [];
    //var reti = { result: [], error: null };
    try {
        if((await getCurrentUser(res, req, db)).access_level > 500){
            res.send(reti);
            return;
        }

        var users = db.collection("users");

        // запрос получения пользователей
        var isError = false;
        var users_res = null;

        //var proj = {_id:1, login:1, password:0, email:1, telephone:1, access_level:1, info:1};
        var proj = { password: 0 };

        if (args.query !== undefined && args.query !== null) {
            try {
                if (args.query._id !== undefined && args.query._id !== null) { args.query._id = ObjectId(args.query._id); }
                users_res = users.find(args.query, proj);
            } catch (e) { console.log(e); isError = true; };
        }
        if (users_res === null) users_res = users.find({}, proj);


        if (args.sort !== undefined && args.sort !== null) try { users_res = users_res.sort(args.sort); } catch (e) { console.log(e); isError = true; };
        if (args.limit !== undefined && args.limit !== null) try { users_res = users_res.limit(args.limit); } catch (e) { console.log(e); isError = true; };


        if (isError) reti["error"] = "Не верно указаны аргументы команды get_users";




        var doc = await users_res.next();
        while (doc !== null) {
            //console.log(doc);

            reti["result"].push(doc);

            doc = await users_res.next();
        }
        await users_res.close();

    } catch(e){
        console.log(e);
    }

    reti.access = c_user.access_level;
    res.send(reti);
}

/**
 * Получить пользователя по идентификатору
 * @param {*} res 
 * @param {*} args 
 */
async function getUserById(cmd, args, db, req, res, c_user) {
    var reti = new qResult(); reti.result = {};
    // var reti = { result: {}, error: null };
    try {
        if((await getCurrentUser(res, req, db)).access_level > 500){
            res.send(reti);
            return;
        }

        var users = db.collection("users");

        if (args._id !== undefined && args._id !== null) {
            var proj = { _id: 1, login: 1, password: 0, email: 1, telephone: 1, access_level: 1, info: 1 };
            reti.result = await users.findOne({ _id: new ObjectId(args._id) }, proj);
        } else {
            reti.error = "Не верно указаны аргументы команды get_user";
        }

    } catch(e){
        console.log(e);
    }

    reti.access = c_user.access_level;
    res.send(reti);
}

async function saveUser(cmd, args, db, req, res, c_user) {
    var reti = new qResult(); reti.result = {};
    // var reti = { result: {}, error: null };

    // console.log(args);

    const crypto = require('crypto');

    try {

        if((await getCurrentUser(res, req, db)).access_level > 500){
            res.send(reti);
            return;
        }

        var users = db.collection("users");

        var u_obj = {};
        var is_new_user = false;

        if (args._id === undefined || args._id === null) { u_obj._id = new ObjectId(); is_new_user = true; } else { u_obj._id = new ObjectId(args._id); }
        if (args.login === undefined || args.login === null || args.login.trim() === "") { reti.error = "Не указан логин"; }
        if (args.email === undefined || args.email === null || args.email.trim() === "") { reti.error = "Не указан email"; }

        u_obj.login = args.login.trim();
        u_obj.email = args.email;
        u_obj.telephone = args.telephone || "";
        if (args.access_level === undefined || args.access_level === null) args.access_level = 1000;
        u_obj.access_level = args.access_level;
        u_obj.info = args.info || "";
        u_obj.active = args.active || false;
        u_obj.activation_code = args.activation_code || "";
        u_obj.remember_code = args.remember_code || "";
        u_obj.email_active = args.email_active || false;
        u_obj.email_code = args.email_code || "";
        if (args.isSetPassword || is_new_user) {
            u_obj.password = args.newPassword || "";
            u_obj.password = crypto.createHmac('sha256', 'alex-xp').update(u_obj.password).digest('hex');
        }

        if (reti.error === null) {
            if (is_new_user) {
                // проверим на совпадение с другим логином

                var ures = await users.findOne({ "login": u_obj.login });

                if (ures === null) {
                    // сохраним
                    await users.insertOne(u_obj).catch((e) => { reti.error = e; });
                    reti.result = { "operation": "INSERT", "result": "OK" };
                } else {
                    reti.result = { "operation": "INSERT", "result": "ERROR" };
                    reti.error = "Пользователь с данным логином уже существует";
                }

            } else {
                await users.updateOne({ _id: u_obj._id }, { $set: u_obj }).catch((e) => { reti.error = e; });
                reti.result = { "operation": "UPDATE", "result": "OK" };
            }
        }
    } catch(e){
        console.log(e);
    }

    reti.access = c_user.access_level;
    res.send(reti);

}


//*************************************************************************************************************************

/**
 * Распределение запроса по командам API пользователей
 * @param {*} cmd 
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
async function API_Users(cmd, args, db, req, res, c_user) {
    // разбор команды и отправка данных
    if (cmd === "auth_user") {
        try { await authUser(cmd, args, db, req, res, c_user); } catch (e) { console.log(e); }; return true;
    } else if (cmd === "exit_user") {
        try { await exitUser(cmd, args, db, req, res, c_user); } catch (e) { console.log(e); }; return true;
    } else if (cmd === "get_users") { // получить пользователей по запросу
        try { await getUsers(cmd, args, db, req, res, c_user); } catch (e) { console.log(e); }; return true;
    } else if (cmd === "get_user") {  // получить пользователя по идентификатору
        try { await getUserById(cmd, args, db, req, res, c_user); } catch (e) { console.log(e); }; return true;
    } else if (cmd === "save_user") { // сохранить пользователя
        try { await saveUser(cmd, args, db, req, res, c_user); } catch (e) { console.log(e); }; return true;
    }
}


module.exports = { API_Users, getCurrentUser };

