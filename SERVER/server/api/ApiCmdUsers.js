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
exports.ApiCmdUsers = void 0;
var Message_1 = require("../api/Message");
var UsersTable_1 = require("../db/tables/UsersTable");
var ApiUserEntity_1 = require("./entityes/ApiUserEntity");
var UsersSessionsTable_1 = require("../db/tables/UsersSessionsTable");
function cmd_login(api_obj) {
    return __awaiter(this, void 0, void 0, function () {
        var login, password, ut, ue, ut_sess, sess;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    login = api_obj.args.login || null;
                    password = api_obj.args.password || null;
                    if (login === null || password === null) {
                        api_obj.result.error = "\u0412 \u041A\u041E\u041C\u0410\u041D\u0414\u0415 \"".concat(api_obj.cmd, "\" \u041D\u0415 \u0414\u041E\u0421\u0422\u0410\u0422\u041E\u0427\u041D\u041E \u0410\u0420\u0413\u0423\u041C\u0415\u041D\u0422\u041E\u0412");
                        return [2];
                    }
                    ut = new UsersTable_1.UsersTable(api_obj.db_conn);
                    return [4, ut.getUserByLogin(login, password)];
                case 1:
                    ue = _a.sent();
                    if (ue === null) {
                        api_obj.result.messages.push((0, Message_1.newMessage)(Message_1.MSG_TYPES.ERROR, "Авторизация", "Не совпадают логин и пароль пользователя."));
                        return [2];
                    }
                    ut_sess = new UsersSessionsTable_1.UsersSessionsTable(api_obj.db_conn);
                    return [4, ut_sess.createSession(ue.id)];
                case 2:
                    sess = _a.sent();
                    if (sess === null) {
                        api_obj.result.messages.push((0, Message_1.newMessage)(Message_1.MSG_TYPES.ERROR, "Авторизация", "Не могу создать сессию пользователя."));
                        return [2];
                    }
                    api_obj.res.cookie('key01', sess.id, { expires: sess.expires, httpOnly: true, path: '/', secure: true });
                    api_obj.res.cookie('key02', sess.key_uid, { expires: sess.expires, httpOnly: true, path: '/', secure: true });
                    api_obj.res.cookie('key03', sess.sess_key, { expires: sess.expires, httpOnly: true, path: '/', secure: true });
                    api_obj.result.user = (0, ApiUserEntity_1.getUserApi)(ue);
                    api_obj.result.messages.push((0, Message_1.newMessage)(Message_1.MSG_TYPES.SUSSCESS, "Авторизация", "Пользователь успешно авторизован."));
                    return [2];
            }
        });
    });
}
function cmd_logout(api_obj) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            api_obj.res.cookie('key01', "", { expires: new Date(Date.now() - 100), httpOnly: true, path: '/', secure: true });
            api_obj.res.cookie('key02', "", { expires: new Date(Date.now() - 100), httpOnly: true, path: '/', secure: true });
            api_obj.res.cookie('key03', "", { expires: new Date(Date.now() - 100), httpOnly: true, path: '/', secure: true });
            return [2];
        });
    });
}
function ApiCmdUsers(api_obj) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!(api_obj.cmd === 'login')) return [3, 2];
                    return [4, cmd_login(api_obj)];
                case 1:
                    _a.sent();
                    return [2, true];
                case 2:
                    if (!(api_obj.cmd === 'logout')) return [3, 4];
                    return [4, cmd_logout(api_obj)];
                case 3:
                    _a.sent();
                    return [2, true];
                case 4: return [2, false];
            }
        });
    });
}
exports.ApiCmdUsers = ApiCmdUsers;
//# sourceMappingURL=ApiCmdUsers.js.map