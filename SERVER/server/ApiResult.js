"use strict";
exports.__esModule = true;
exports.ApiResult = exports.getUserApi = exports.ApiUserEntity = void 0;
var ApiUserEntity = (function () {
    function ApiUserEntity() {
    }
    return ApiUserEntity;
}());
exports.ApiUserEntity = ApiUserEntity;
function getUserApi(ue) {
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
exports.getUserApi = getUserApi;
var ApiResult = (function () {
    function ApiResult() {
        this.error = null;
        this.result = null;
        this.user = null;
        this.messages = new Array();
    }
    return ApiResult;
}());
exports.ApiResult = ApiResult;
//# sourceMappingURL=ApiResult.js.map