"use strict";
exports.__esModule = true;
exports.UserEntity = void 0;
var UserEntity = (function () {
    function UserEntity() {
        this.id = 0;
        this.login = '';
        this.password = '';
        this.u_access = 99999;
        this.user_data = {};
        this.active = false;
        this.activation_code = '';
        this.remember_code = '';
        this.email = '';
        this.email_active = false;
        this.email_code = '';
    }
    return UserEntity;
}());
exports.UserEntity = UserEntity;
//# sourceMappingURL=UserEntity.js.map