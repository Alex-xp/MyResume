// ПОДХОДИТ ДЛЯ СЕРВЕРОВ NODE-EXPRESS С ПРОЕКТОМ НА REACT !!!!!!!


/** Перевод объекта в строку для дальнейшей передачи данных */
function objToString (obj){ // если данные не большие - можно использовать JSON.stringify({...})
    var sstr = "{";

    var first = true;
    for(var k in obj){

        if(first){
            first = false;
        }else{
            sstr += ',';
        }

        if(obj[k] === null){
            sstr += '"'+k+'":null'
        } else if('object' == typeof obj[k]){
            sstr += '"'+k+'":' + objToString(obj[k])
        }else if('undefined'== typeof obj[k]){
            //
        }else if('string'== typeof obj[k]){
            sstr += '"'+k+'":"' + obj[k].replaceAll('"', '\"') + '"'
        }else{
            sstr += '"'+k+'":' + obj[k]
        }
    }
    sstr += "}"
    return sstr;
}

/** ОТПРАВКА ДАННЫХ НА СЕРВЕР ДЛЯ ПОЛУЧЕНИЯ РЕЗУЛЬТАТА ПО КОМАНДЕ */
export function SendApi(cmd, args, callback, err_callback){
    var callback = callback || null
    var err_callback = err_callback || null

    var dt = {"cmd":cmd, "args":args};
    
    // запрос
    fetch("/api", { method:'POST', body:objToString(dt), headers:{ 'Content-Type': 'application/json'} })
    .then((resp) => resp.json())
    .then((resp) => { 
        if (resp.error !== undefined && resp.error !== null){
            if(err_callback !==null) err_callback(resp); 
            return;
        }

        if(callback !==null) callback(resp); 
    })
    .catch((err) => { 
        if(err_callback !==null) err_callback(err); 
    });
}
