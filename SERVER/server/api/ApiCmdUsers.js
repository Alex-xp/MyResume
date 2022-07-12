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
function cmd_find_users(api_obj) {
    return __awaiter(this, void 0, void 0, function () {
        var search_txt, reti, ut, users_db, ue_ii;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    search_txt = api_obj.args.login || '';
                    reti = [];
                    ut = new UsersTable_1.UsersTable(api_obj.db_conn);
                    return [4, ut.findUsers(search_txt)];
                case 1:
                    users_db = _a.sent();
                    for (ue_ii in users_db)
                        reti.push((0, ApiUserEntity_1.getUserApi)(users_db[ue_ii]));
                    api_obj.result.result = reti;
                    return [2];
            }
        });
    });
}
function set_user_activation(api_obj) {
    return __awaiter(this, void 0, void 0, function () {
        var uid, act, ut;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    uid = api_obj.args.id || 0;
                    act = api_obj.args.active || false;
                    if (uid === 0)
                        return [2];
                    ut = new UsersTable_1.UsersTable(api_obj.db_conn);
                    return [4, ut.setUserActive(uid, act)];
                case 1: return [2, _a.sent()];
            }
        });
    });
}
function test_user_double(api_obj) {
    return __awaiter(this, void 0, void 0, function () {
        var uid, login, ut, reti;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    uid = api_obj.args.id || 0;
                    login = api_obj.args.login || '';
                    if (uid === 0)
                        return [2, true];
                    if (login.trim() === '')
                        return [2, true];
                    ut = new UsersTable_1.UsersTable(api_obj.db_conn);
                    return [4, ut.testDoubleLogin(uid, login)];
                case 1:
                    reti = _a.sent();
                    api_obj.result.result = reti;
                    return [2, reti];
            }
        });
    });
}
function save_user(api_obj) {
    return __awaiter(this, void 0, void 0, function () {
        var uid, login, email, active, u_access, email_active, ut, ret_uid;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    uid = api_obj.args.id || 0;
                    login = api_obj.args.login || '';
                    email = api_obj.args.email || '';
                    active = api_obj.args.active || false;
                    u_access = api_obj.args.u_access || 10000;
                    email_active = api_obj.args.email_active || false;
                    api_obj.result.result = 0;
                    if (login.trim().length < 6)
                        return [2, false];
                    ut = new UsersTable_1.UsersTable(api_obj.db_conn);
                    return [4, ut.save_basic(uid, login, active, email, u_access, email_active)];
                case 1:
                    ret_uid = _a.sent();
                    if (ret_uid > 0) {
                        api_obj.result.result = ret_uid;
                        api_obj.result.messages.push((0, Message_1.newMessage)(Message_1.MSG_TYPES.SUSSCESS, "Сохранение пользователя", "\u041F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044C \"".concat(login, "\" \u0443\u0441\u043F\u0435\u0448\u043D\u043E \u0441\u043E\u0445\u0440\u0430\u043D\u0435\u043D")));
                        return [2, true];
                    }
                    api_obj.result.messages.push((0, Message_1.newMessage)(Message_1.MSG_TYPES.ERROR, "Сохранение пользователя", "Не могу сохранить пользователя"));
                    return [2, false];
            }
        });
    });
}
function set_password(api_obj) {
    return __awaiter(this, void 0, void 0, function () {
        var uid, password, ut, q_ret;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    uid = api_obj.args.id || 0;
                    password = api_obj.args.password || '';
                    if (uid === 0 && password.trim() === '') {
                        api_obj.result.messages.push((0, Message_1.newMessage)(Message_1.MSG_TYPES.ERROR, "Изменение пароля", "Не верно передан пользователь или пароль"));
                        return [2, false];
                    }
                    ut = new UsersTable_1.UsersTable(api_obj.db_conn);
                    return [4, ut.set_password(uid, password)];
                case 1:
                    q_ret = _a.sent();
                    api_obj.result.result = q_ret;
                    if (q_ret) {
                        api_obj.result.messages.push((0, Message_1.newMessage)(Message_1.MSG_TYPES.SUSSCESS, "Изменение пароля", "\u041D\u043E\u0432\u044B\u0439 \u043F\u0430\u0440\u043E\u043B\u044C \u0443\u0441\u043F\u0435\u0448\u043D\u043E \u0441\u043E\u0445\u0440\u0430\u043D\u0435\u043D"));
                    }
                    else {
                        api_obj.result.messages.push((0, Message_1.newMessage)(Message_1.MSG_TYPES.ERROR, "Изменение пароля", "Не могу сохранить пароль"));
                    }
                    return [2, q_ret];
            }
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
                case 4:
                    if (!(api_obj.cmd === 'find_users')) return [3, 6];
                    return [4, cmd_find_users(api_obj)];
                case 5:
                    _a.sent();
                    return [2, true];
                case 6:
                    if (!(api_obj.cmd === 'set_user_activation')) return [3, 8];
                    return [4, set_user_activation(api_obj)];
                case 7:
                    _a.sent();
                    return [2, true];
                case 8:
                    if (!(api_obj.cmd === 'test_user_double')) return [3, 10];
                    return [4, test_user_double(api_obj)];
                case 9:
                    _a.sent();
                    return [2, true];
                case 10:
                    if (!(api_obj.cmd === 'save_user')) return [3, 12];
                    return [4, save_user(api_obj)];
                case 11:
                    _a.sent();
                    return [2, true];
                case 12:
                    if (!(api_obj.cmd === 'set_password')) return [3, 14];
                    return [4, set_password(api_obj)];
                case 13:
                    _a.sent();
                    return [2, true];
                case 14: return [2, false];
            }
        });
    });
}
exports.ApiCmdUsers = ApiCmdUsers;
//# sourceMappingURL=ApiCmdUsers.js.map