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
exports.ClientRouter = void 0;
var BaseRouter_1 = require("./BaseRouter");
var ClientRouter = (function (_super) {
    __extends(ClientRouter, _super);
    function ClientRouter(_app, _db_conn) {
        var _this = _super.call(this, _app, _db_conn) || this;
        _this.layout_name = "index.hbs";
        _this.prefix = "/";
        var admin_panel = new BaseRouter_1.RoutePather("", "001-index", "Главная страница");
        _this.routePathes.push(admin_panel);
        return _this;
    }
    return ClientRouter;
}(BaseRouter_1.BaseRouter));
exports.ClientRouter = ClientRouter;
//# sourceMappingURL=ClientRouter.js.map