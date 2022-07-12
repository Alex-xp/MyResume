/**
 * АВТОРЫ: 
 *      alex-xp@list.ru Сунегин Александр
 * 
 * ОПИСАНИЕ:
 * информация из базы данных о пользователе (объект полученный по API)
 */

export class UserEntity{

    constructor(){}

    public id:number = 0;
    public login:string = '';
    public email:string = '';
    public active:boolean = false;
    public u_access:number = 10000;
    public email_active:boolean = false;
    public activation_code:string = '';
    public remember_code:string = '';
    public email_code:string = '';
    public user_data:Object = {};
}

