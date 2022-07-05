"use strict";
exports.__esModule = true;
exports.newMessage = exports.Message = exports.MSG_TYPES = void 0;
exports.MSG_TYPES = {
    ERROR: "MSG_EROROR",
    SUSSCESS: "MSG_SUSSCESS",
    INFO: "MSG_INFO",
    WARNING: "MSG_WARNING"
};
var Message = (function () {
    function Message() {
    }
    return Message;
}());
exports.Message = Message;
function newMessage(msg_type, msg_title, msg_text) {
    var reti = new Message();
    reti.msgType = msg_type;
    reti.msgTitle = msg_title;
    reti.msgText = msg_text;
    return reti;
}
exports.newMessage = newMessage;
//# sourceMappingURL=Message.js.map