/**
 * АВТОРЫ: 
 *      alex-xp@list.ru Сунегин Александр
 * 
 * ОПИСАНИЕ:
 * Сушьность пользователя для возврата данных по API
 */

 import { UserEntity } from '../../db/entityes/UserEntity';

/**
 * КЛАСС С ОПИСАНИЕМ ВОЗВРАЩАЕМОГО ПОЛЬЗОВАТЕЛЯ
 * В пределах возврата данных нельзя возвращать сушьности напрямую.
 */
 export class ApiUserEntity{
    public id:number;
    public login:string;
    public email:string;
    public active:boolean;
    public u_access:number;
    public email_active:boolean;
    public activation_code:string;
    public remember_code:string;
    public email_code:string;
    public user_data:Object;
}

/**
 * Заполнить объект возврата данных о пользователе
 * @param ue 
 * @returns 
 */
export function getUserApi(ue:UserEntity):ApiUserEntity{
    var reti = new ApiUserEntity();
    reti.id = ue.id;
    reti.login = ue.login;
    reti.email = ue.email;
    reti.active = ue.active;
    reti.u_access = ue.u_access;
    reti.email_active = ue.email_active;
    reti.user_data = ue.user_data;
    reti.activation_code = ue.activation_code;
    reti.remember_code = ue.remember_code;
    reti.email_code = ue.email_code;
    return reti;
}

