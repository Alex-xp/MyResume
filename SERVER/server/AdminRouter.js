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
        _this.layout_name = "admin.hbs";
        _this.prefix = "/admin";
        var admin_panel = new BaseRouter_1.RoutePather("", "002-admin_panel", "Панель управления");
        admin_panel.access_level = 100;
        admin_panel.no_access_js = "001-login";
        _this.routePathes.push(admin_panel);
        return _this;
    }
    return AdminRouter;
}(BaseRouter_1.BaseRouter));
exports.AdminRouter = AdminRouter;
//# sourceMappingURL=AdminRouter.js.map