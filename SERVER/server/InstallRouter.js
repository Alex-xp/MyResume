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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.InstallRouter = void 0;
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var InstallRouter = (function () {
    function InstallRouter(_app, _db_conn) {
        this.app = null;
        this.db_conn = null;
        this.app = _app;
        this.db_conn = _db_conn;
    }
    InstallRouter.prototype.route = function () {
        var _this = this;
        this.app.get('/install', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                res.render("install/install_001.hbs", { app: "install_01" });
                return [2];
            });
        }); });
        this.app.get('/install/002', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.db_conn.Exec({ text: fs_1["default"].readFileSync(path_1["default"].normalize(path_1["default"].join(__dirname, "..", "sql", "functions_start.sql")), { encoding: 'utf-8' }) })];
                    case 1:
                        _a.sent();
                        return [4, this.db_conn.Exec({ text: fs_1["default"].readFileSync(path_1["default"].normalize(path_1["default"].join(__dirname, "..", "sql", "users_groups.sql")), { encoding: 'utf-8' }) })];
                    case 2:
                        _a.sent();
                        return [4, this.db_conn.Exec({ text: fs_1["default"].readFileSync(path_1["default"].normalize(path_1["default"].join(__dirname, "..", "sql", "users.sql")), { encoding: 'utf-8' }) })];
                    case 3:
                        _a.sent();
                        return [4, this.db_conn.Exec({
                                text: "INSERT INTO users (login, password, u_access, user_data, active, email, email_active, group_id)VALUES ($1, $2, $3, $4, $5, $6, $7, $8);",
                                values: ['admin', this.db_conn.sha256('admin'), 0, {}, true, 'admin@admin.ru', true, 1]
                            })];
                    case 4:
                        _a.sent();
                        return [4, this.db_conn.Exec({ text: fs_1["default"].readFileSync(path_1["default"].normalize(path_1["default"].join(__dirname, "..", "sql", "users_sessions.sql")), { encoding: 'utf-8' }) })];
                    case 5:
                        _a.sent();
                        return [4, this.db_conn.Exec({ text: fs_1["default"].readFileSync(path_1["default"].normalize(path_1["default"].join(__dirname, "..", "sql", "functions_end.sql")), { encoding: 'utf-8' }) })];
                    case 6:
                        _a.sent();
                        res.render("install/install_002.hbs", { app: "install_01" });
                        return [2];
                }
            });
        }); });
    };
    return InstallRouter;
}());
exports.InstallRouter = InstallRouter;
//# sourceMappingURL=InstallRouter.js.map