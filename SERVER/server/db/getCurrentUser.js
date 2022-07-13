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
exports.getCurrentUser = void 0;
var UserEntity_1 = require("./entityes/UserEntity");
var UsersSessionsTable_1 = require("./tables/UsersSessionsTable");
function _getSession(db_conn, sess_id, uid_key, sess_key) {
    return __awaiter(this, void 0, void 0, function () {
        var st;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (sess_id === null || uid_key === null || sess_key === null)
                        return [2, null];
                    st = new UsersSessionsTable_1.UsersSessionsTable(db_conn);
                    return [4, st.clearOldSessions()];
                case 1:
                    _a.sent();
                    return [4, st.getSession(sess_id, uid_key, sess_key)];
                case 2: return [2, _a.sent()];
            }
        });
    });
}
function _updateSession(sess, res, sess_id, uid_key, sess_key) {
    return __awaiter(this, void 0, void 0, function () {
        var exp;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    exp = new Date(Date.now() + 3600 * 24 * 15 * 1000);
                    res.cookie("key01", sess_id, { expires: exp, httpOnly: true, path: '/', secure: true });
                    res.cookie("key02", uid_key, { expires: exp, httpOnly: true, path: '/', secure: true });
                    res.cookie("key03", sess_key, { expires: exp, httpOnly: true, path: '/', secure: true });
                    return [4, sess.updateExpires(exp)];
                case 1:
                    _a.sent();
                    return [2];
            }
        });
    });
}
function _clearSession(res) {
    var exp = new Date(Date.now() - 1000);
    res.cookie("key01", "", { expires: exp, httpOnly: true, path: '/', secure: true });
    res.cookie("key02", "", { expires: exp, httpOnly: true, path: '/', secure: true });
    res.cookie("key03", "", { expires: exp, httpOnly: true, path: '/', secure: true });
}
function getCurrentUser(req, res, db_conn) {
    return __awaiter(this, void 0, void 0, function () {
        var reti, key01, key02, key03, sess, user_id, user, u;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    reti = new UserEntity_1.UserEntity(db_conn);
                    req.cookies;
                    key01 = req.cookies["key01"] || null;
                    key02 = req.cookies["key02"] || null;
                    key03 = req.cookies["key03"] || null;
                    return [4, _getSession(db_conn, key01, key02, key03)];
                case 1:
                    sess = _a.sent();
                    if (!(sess !== null)) return [3, 4];
                    user_id = sess.uid;
                    user = null;
                    return [4, db_conn.QueryOne({ text: "SELECT * FROM users WHERE id=$1", values: [user_id] })];
                case 2:
                    u = _a.sent();
                    if (u !== null)
                        user = new UserEntity_1.UserEntity(db_conn, u);
                    if (user === null) {
                        _clearSession(res);
                        return [2, reti];
                    }
                    return [4, _updateSession(sess, res, key01, key02, key03)];
                case 3:
                    _a.sent();
                    return [2, user];
                case 4:
                    _clearSession(res);
                    return [2, reti];
            }
        });
    });
}
exports.getCurrentUser = getCurrentUser;
//# sourceMappingURL=getCurrentUser.js.map