"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
exports.UserEntity = void 0;
var BaseEntity_1 = require("./BaseEntity");
var UserEntity = (function (_super) {
    __extends(UserEntity, _super);
    function UserEntity(db_conn, udt) {
        var _this = _super.call(this, db_conn) || this;
        _this.id = 0;
        _this.login = '';
        _this.password = '';
        _this.u_access = 99999;
        _this.user_data = {};
        _this.active = false;
        _this.activation_code = '';
        _this.remember_code = '';
        _this.email = '';
        _this.email_active = false;
        _this.email_code = '';
        if (udt !== undefined && udt !== null) {
            _this.id = udt.id;
            _this.login = udt.login;
            _this.password = udt.password;
            _this.u_access = udt.u_access;
            _this.user_data = udt.user_data;
            _this.active = udt.active;
            _this.activation_code = udt.activation_code;
            _this.remember_code = udt.remember_code;
            _this.email = udt.email;
            _this.email_active = udt.email_active;
            _this.email_code = udt.email_code;
        }
        return _this;
    }
    return UserEntity;
}(BaseEntity_1.BaseEntity));
exports.UserEntity = UserEntity;
//# sourceMappingURL=UserEntity.js.map