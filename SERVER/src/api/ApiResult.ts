import { ApiUserEntity } from './entityes/ApiUserEntity';
import { Message } from './Message';

/**
 * Результат обращения по API
 */
export class ApiResult{
    public error: any = null; // возврат ошибки (только нестандартная ситуация в коде - для облегчения анализа)
    public result: Object | Array<any> | string | boolean = null; // результат запроса (объект строки БД, набор строк БД, текст)
    public user: ApiUserEntity = null; // текущий пользователь
    public messages:Array<Message> = new Array(); // сообщения
}

