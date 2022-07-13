/**
 * АВТОРЫ: 
 *      alex-xp@list.ru Сунегин Александр
 * 
 * ОПИСАНИЕ:
 * Системные сообщения
 */


/**
 * Описание возможных типов системных сообщений
 */
 export const MSG_TYPES = {
    ERROR: "MSG_EROROR",
    SUSSCESS: "MSG_SUSSCESS",
    INFO: "MSG_INFO",
    WARNING: "MSG_WARNING"
}

/**
 * Сообщение на сайт
 */
export class Message{
    public msgType:string;
    public msgTitle:string;
    public msgText:string;
}

/**
 * Создать заполненное сооьщение для отображения на сайте
 * @param msg_type 
 * @param msg_title 
 * @param msg_text 
 * @returns 
 */
export function newMessage(msg_type:string, msg_title:string, msg_text:string):Message{
    var reti = new Message();
    reti.msgType = msg_type;
    reti.msgTitle = msg_title;
    reti.msgText = msg_text;
    return reti;
}
