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
exports.DBConnector = void 0;
var pg_1 = __importDefault(require("pg"));
var crypto_1 = __importDefault(require("crypto"));
var DBConnector = (function () {
    function DBConnector() {
        this.CRYPTO_KEY = 'alex-xp';
        this.pool = null;
        try {
            this.pool = new pg_1["default"].Pool({
                user: 'postgres',
                host: 'localhost',
                database: 'site_xdata',
                password: '000000',
                port: 5432
            });
        }
        catch (error) {
            console.log(error);
            this.pool = null;
        }
    }
    DBConnector.prototype.begin = function () {
        return __awaiter(this, void 0, void 0, function () {
            var error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4, this.pool.connect()];
                    case 1: return [2, _a.sent()];
                    case 2:
                        error_1 = _a.sent();
                        console.log(error_1);
                        return [2, null];
                    case 3: return [2];
                }
            });
        });
    };
    DBConnector.prototype.end = function (client) {
        return __awaiter(this, void 0, void 0, function () {
            var error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4, client.release()];
                    case 1:
                        _a.sent();
                        return [3, 3];
                    case 2:
                        error_2 = _a.sent();
                        console.log(error_2);
                        return [2, false];
                    case 3: return [2, true];
                }
            });
        });
    };
    DBConnector.prototype.Dectroy = function () {
        return __awaiter(this, void 0, void 0, function () {
            var error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4, this.pool.end()];
                    case 1:
                        _a.sent();
                        return [3, 3];
                    case 2:
                        error_3 = _a.sent();
                        console.log(error_3);
                        return [2, false];
                    case 3: return [2, true];
                }
            });
        });
    };
    DBConnector.prototype.Exec = function (q) {
        return __awaiter(this, void 0, void 0, function () {
            var cl, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        return [4, this.begin()];
                    case 1:
                        cl = _a.sent();
                        return [4, cl.query(q)];
                    case 2:
                        _a.sent();
                        return [4, this.end(cl)];
                    case 3:
                        _a.sent();
                        return [2, true];
                    case 4:
                        e_1 = _a.sent();
                        console.log(e_1);
                        return [2, false];
                    case 5: return [2];
                }
            });
        });
    };
    DBConnector.prototype.Query = function (q) {
        return __awaiter(this, void 0, void 0, function () {
            var cl, q_res, reti, row_ii, e_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        return [4, this.begin()];
                    case 1:
                        cl = _a.sent();
                        return [4, cl.query(q)];
                    case 2:
                        q_res = _a.sent();
                        reti = [];
                        for (row_ii in q_res.rows)
                            reti.push(q_res.rows[row_ii]);
                        return [4, this.end(cl)];
                    case 3:
                        _a.sent();
                        return [2, reti];
                    case 4:
                        e_2 = _a.sent();
                        console.log(e_2);
                        return [2, []];
                    case 5: return [2];
                }
            });
        });
    };
    DBConnector.prototype.QueryOne = function (q) {
        return __awaiter(this, void 0, void 0, function () {
            var q_res, e_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4, this.Query(q)];
                    case 1:
                        q_res = _a.sent();
                        if (q_res.length > 0)
                            return [2, q_res[0]];
                        return [2, null];
                    case 2:
                        e_3 = _a.sent();
                        console.log(e_3);
                        return [2, null];
                    case 3: return [2];
                }
            });
        });
    };
    DBConnector.prototype.sha256 = function (str) {
        return crypto_1["default"].createHmac('sha256', this.CRYPTO_KEY).update(str).digest('hex');
    };
    return DBConnector;
}());
exports.DBConnector = DBConnector;
//# sourceMappingURL=DBConnector.js.map