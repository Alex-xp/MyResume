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
exports.UsersTable = void 0;
var BaseTable_1 = require("./BaseTable");
var UserEntity_1 = require("../entityes/UserEntity");
var UsersTable = (function (_super) {
    __extends(UsersTable, _super);
    function UsersTable() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    UsersTable.prototype.getUserById = function (user_id) {
        return __awaiter(this, void 0, void 0, function () {
            var u, reti;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.db_conn.QueryOne({
                            text: "SELECT * FROM users WHERE id=$1",
                            values: [user_id]
                        })];
                    case 1:
                        u = _a.sent();
                        if (u === null)
                            return [2, null];
                        reti = new UserEntity_1.UserEntity(this.db_conn);
                        reti.id = u.id;
                        reti.login = u.login;
                        reti.password = u.password;
                        reti.u_access = u.u_access;
                        reti.user_data = u.user_data;
                        reti.active = u.active;
                        reti.activation_code = u.activation_code;
                        reti.remember_code = u.remember_code;
                        reti.email = u.email;
                        reti.email_active = u.email_active;
                        reti.email_code = u.email_code;
                        return [2, reti];
                }
            });
        });
    };
    UsersTable.prototype.getUserByLogin = function (login, password) {
        return __awaiter(this, void 0, void 0, function () {
            var db_res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.db_conn.QueryOne({
                            text: "SELECT * FROM users WHERE login=$1 AND password=$2",
                            values: [login, this.db_conn.sha256(password)]
                        })];
                    case 1:
                        db_res = _a.sent();
                        if (db_res === null) {
                            return [2, null];
                        }
                        return [2, new UserEntity_1.UserEntity(this.db_conn, db_res)];
                }
            });
        });
    };
    UsersTable.prototype.findUsers = function (s_login) {
        return __awaiter(this, void 0, void 0, function () {
            var reti;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.db_conn.Query({
                            text: 'SELECT * FROM users WHERE login LIKE $1',
                            values: ['%' + s_login + '%']
                        })];
                    case 1:
                        reti = _a.sent();
                        return [2, reti];
                }
            });
        });
    };
    return UsersTable;
}(BaseTable_1.BaseTable));
exports.UsersTable = UsersTable;
//# sourceMappingURL=UsersTable.js.map