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
exports.AdminRouter = void 0;
var BaseRouter_1 = require("./BaseRouter");
var AdminRouter = (function (_super) {
    __extends(AdminRouter, _super);
    function AdminRouter(_app, _db_conn) {
        var _this = _super.call(this, _app, _db_conn) || this;
        _this.view = 'admin.hbs';
        return _this;
    }
    AdminRouter.prototype.route = function () {
        var _this = this;
        this.app.get('/admin', function (req, res) { _this.run(req, res, "002-admin_panel", "Панель управления", 100, "001-login"); });
        this.app.get('/admin/users', function (req, res) { _this.run(req, res, "003-users", "Управление пользователями", 100, "001-login"); });
    };
    return AdminRouter;
}(BaseRouter_1.BaseRouter));
exports.AdminRouter = AdminRouter;
//# sourceMappingURL=AdminRouter.js.map