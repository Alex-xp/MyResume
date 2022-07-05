import { UserEntity } from './db_data/UserEntity';


/** Перевод объекта в строку для дальнейшей передачи данных */
function objToString (obj:any):string{ // если данные не большие - можно использовать JSON.stringify({...})
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
            sstr += '"'+k+'":"' + obj[k].replaceAll('"', '\\"') + '"'
        }else{
            sstr += '"'+k+'":' + obj[k]
        }
    }
    sstr += "}"
    return sstr;
}


/**
 * ОТВЕТ ОТ СЕРВЕРА - ЧТО ЖДАТЬ
 */
export type ApiResult = {
    result: any,
    error:any,
    user:UserEntity,
    messages: Array<any>
}




export function SendApi(cmd:string, args:Object, callback:(res:ApiResult)=>{}, err_callback?:(err:any)=>{}){
    var dt = {"cmd":cmd, "args":args};

    var err_callback = err_callback || null;

    fetch("/api", { method:'POST', body:objToString(dt), headers:{ 'Content-Type': 'application/json'} })
    .then((resp) => resp.json())
    .then((resp) => { 
        var xres:ApiResult = resp;
        if (xres.error !== undefined && xres.error !== null){
            if(err_callback !==null) err_callback(xres); 
            return;
        }

        if(callback !==null) callback(xres); 
    })
    .catch((err) => { 
        if(err_callback !==null) err_callback(err); 
    });
}



