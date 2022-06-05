const { dbClient } = require('./db/dbConnector');

const { getCurrentUser } = require('./api_users');

const { RouteAPI } = require('./api');




async function renderPage(req, res, title_pg, app_js){
    const mdb = new dbClient();
    try{
        await mdb.Connect();

        //var c_user = await getCurrentUser(res, req, mdb);
        res.render('index.hbs', { title: title_pg, app_js:app_js });

    }finally{
        await mdb.Close();
        return true;
    }
};




function route(app) {

    // подключаем обработчик get запроса
    app.route('/').all((req, res, next) => { // строгое соответствие пути '/' (остальное выдаст 404 Not Found)
        //res.send('Hello World!')
        renderPage(req, res, "ЗауралСтрой", "main_page");
    });

    app.route('/exit').all((req, res, next) => { renderPage(req, res, "ЗауралСтрой", "user/user_exit_page"); });




    app.route('/test').all((req, res, next) => { renderPage(req, res, "ЗауралСтрой", "template_page"); });




    app.route("/api").post(async (req, res, next) => {
        const mdb = new dbClient();
        try{
            await mdb.Connect();
    
            var c_user = await getCurrentUser(res, req, mdb);
            await RouteAPI(req, res, mdb, c_user);
    
        }finally{
            await mdb.Close();
            return true;
        }
    });

}



module.exports = { route } 

