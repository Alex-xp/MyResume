"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.BaseRouter = void 0;
var getCurrentUser_1 = require("./db/getCurrentUser");
var BaseRouter = (function () {
    function BaseRouter(_app, _db_conn) {
        this.app = null;
        this.db_conn = null;
        this.view = 'index.hbs';
        this.app = _app;
        this.db_conn = _db_conn;
    }
    BaseRouter.prototype.run = function (req, res, _js_app, _title, access, no_access_js) {
        if (access === void 0) { access = 99999; }
        if (no_access_js === void 0) { no_access_js = null; }
        return __awaiter(this, void 0, void 0, function () {
            var c_user, user_access;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, (0, getCurrentUser_1.getCurrentUser)(req, res, this.db_conn)];
                    case 1:
                        c_user = _a.sent();
                        user_access = c_user.u_access;
                        if (no_access_js !== null && no_access_js.trim() !== '') {
                            if (user_access > access) {
                                res.render(this.view, { app: no_access_js, title: "???????????? ?? ?????????????? ????????????" });
                                return [2];
                            }
                        }
                        res.render(this.view, { app: _js_app, title: _title });
                        return [2];
                }
            });
        });
    };
    BaseRouter.prototype.route = function () { };
    return BaseRouter;
}());
exports.BaseRouter = BaseRouter;
//# sourceMappingURL=BaseRouter.js.map