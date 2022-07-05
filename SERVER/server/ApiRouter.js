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
exports.ApiRouter = void 0;
var ApiResult_1 = require("./api/ApiResult");
var ApiUserEntity_1 = require("./api/entityes/ApiUserEntity");
var getCurrentUser_1 = require("./db/getCurrentUser");
var Message_1 = require("./api/Message");
var ApiObject_1 = require("./api/ApiObject");
var ApiCmdUsers_1 = require("./api/ApiCmdUsers");
var ApiRouter = (function () {
    function ApiRouter(_app, _db_conn) {
        this.app = null;
        this.db_conn = null;
        this.app = _app;
        this.db_conn = _db_conn;
    }
    ApiRouter.prototype.test_messages = function (api_obj) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (api_obj.cmd === 'test_messages') {
                    api_obj.result.messages.push((0, Message_1.newMessage)(Message_1.MSG_TYPES.ERROR, "ERROR TEST", "ERROR TEST MESSAGE"));
                    api_obj.result.messages.push((0, Message_1.newMessage)(Message_1.MSG_TYPES.WARNING, "WARNING TEST", "WARNING TEST MESSAGE"));
                    api_obj.result.messages.push((0, Message_1.newMessage)(Message_1.MSG_TYPES.INFO, "INFO TEST", "INFO TEST MESSAGE"));
                    api_obj.result.messages.push((0, Message_1.newMessage)(Message_1.MSG_TYPES.SUSSCESS, "SUSSCESS TEST", "SUSSCESS TEST MESSAGE"));
                    return [2, true];
                }
                return [2, false];
            });
        });
    };
    ApiRouter.prototype.switchApiCmd = function (api_obj) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.test_messages(api_obj)];
                    case 1:
                        if (_a.sent()) {
                            return [2, true];
                        }
                        return [4, (0, ApiCmdUsers_1.ApiCmdUsers)(api_obj)];
                    case 2:
                        if (_a.sent()) {
                            return [2, true];
                        }
                        return [2, false];
                }
            });
        });
    };
    ApiRouter.prototype.route = function () {
        var _this = this;
        this.app.post('/api', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var api_result, _a, _b, cmd, args, api_obj;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        api_result = new ApiResult_1.ApiResult();
                        _a = api_result;
                        _b = ApiUserEntity_1.getUserApi;
                        return [4, (0, getCurrentUser_1.getCurrentUser)(req, res, this.db_conn)];
                    case 1:
                        _a.user = _b.apply(void 0, [_c.sent()]);
                        cmd = req.body.cmd;
                        args = req.body.args;
                        api_obj = new ApiObject_1.ApiObject();
                        api_obj.req = req;
                        api_obj.res = res;
                        api_obj.cmd = cmd;
                        api_obj.args = args;
                        api_obj.result = api_result;
                        api_obj.db_conn = this.db_conn;
                        if (cmd === 'current_user') {
                            res.send(api_result);
                            return [2];
                        }
                        ;
                        return [4, this.switchApiCmd(api_obj)];
                    case 2:
                        if (_c.sent()) {
                            res.send(api_result);
                            return [2];
                        }
                        ;
                        api_result.error = "\u041A\u043E\u043C\u0430\u043D\u0434\u0430 \"".concat(cmd, "\" \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D\u0430");
                        return [2];
                }
            });
        }); });
    };
    return ApiRouter;
}());
exports.ApiRouter = ApiRouter;
//# sourceMappingURL=ApiRouter.js.map