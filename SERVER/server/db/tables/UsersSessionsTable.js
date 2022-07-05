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
exports.UsersSessionsTable = void 0;
var BaseTable_1 = require("./BaseTable");
var UserSessionEntity_1 = require("../entityes/UserSessionEntity");
var UsersSessionsTable = (function (_super) {
    __extends(UsersSessionsTable, _super);
    function UsersSessionsTable() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    UsersSessionsTable.prototype.clearOldSessions = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.db_conn.Exec({
                            text: "DELETE FROM users_sessions WHERE expires<$1",
                            values: [new Date(Date.now())]
                        })];
                    case 1: return [2, _a.sent()];
                }
            });
        });
    };
    UsersSessionsTable.prototype.getSession = function (sess_id, uid_key, sess_key) {
        return __awaiter(this, void 0, void 0, function () {
            var s_res, reti;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (sess_id === null || uid_key === null || sess_key === null)
                            return [2, null];
                        return [4, this.db_conn.QueryOne({
                                text: "SELECT * FROM users_sessions WHERE id=$1 AND key_uid=$2 AND sess_key=$3",
                                values: [sess_id, uid_key, sess_key]
                            })];
                    case 1:
                        s_res = _a.sent();
                        if (s_res !== null) {
                            reti = new UserSessionEntity_1.UserSessionEntity(this.db_conn);
                            reti.id = s_res.id;
                            reti.uid = s_res.uid;
                            reti.key_uid = s_res.key_uid;
                            reti.sess_key = s_res.sess_key;
                            reti.started = new Date(Date.parse(s_res.started));
                            reti.expires = new Date(Date.parse(s_res.expires));
                            reti.sess_data = s_res.sess_data;
                            return [2, reti];
                        }
                        return [2, null];
                }
            });
        });
    };
    UsersSessionsTable.prototype.createSession = function (uid) {
        return __awaiter(this, void 0, void 0, function () {
            var newExpires, res_db, sess_id, sess;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        newExpires = new Date(Date.now() + (3600 * 24 * 1000) * 15);
                        return [4, this.db_conn.QueryOne({
                                text: "INSERT INTO users_sessions (uid, expires) VALUES ($1, $2) RETURNING id",
                                values: [uid, newExpires]
                            })];
                    case 1:
                        res_db = _a.sent();
                        if (res_db === null || res_db.id < 1)
                            return [2, null];
                        sess_id = res_db.id;
                        return [4, this.db_conn.Exec({
                                text: "UPDATE users_sessions SET key_uid=$1, sess_key=$2 WHERE id=$3",
                                values: [this.db_conn.sha256(uid + ""), this.db_conn.sha256(sess_id + "-" + uid), sess_id]
                            })];
                    case 2:
                        _a.sent();
                        return [4, this.db_conn.QueryOne({
                                text: "SELECT * FROM users_sessions WHERE id=$1",
                                values: [sess_id]
                            })];
                    case 3:
                        sess = _a.sent();
                        if (sess === null || sess.id < 1)
                            return [2, null];
                        return [2, new UserSessionEntity_1.UserSessionEntity(this.db_conn, sess)];
                }
            });
        });
    };
    return UsersSessionsTable;
}(BaseTable_1.BaseTable));
exports.UsersSessionsTable = UsersSessionsTable;
//# sourceMappingURL=UsersSessionsTable.js.map