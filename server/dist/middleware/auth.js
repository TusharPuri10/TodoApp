"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SECRET = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
//secret key for jsonwebtoken
exports.SECRET = 'fisufasfasggaewgfjasbew241qr';
//Authorization
function authorization(req, res, next) {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(' ')[1];
        jsonwebtoken_1.default.verify(token, exports.SECRET, (err, payload) => {
            if (err) {
                return res.sendStatus(403);
            }
            if (!payload) {
                return res.sendStatus(403);
            }
            if (typeof payload === 'string') {
                return res.sendStatus(403);
            }
            req.headers["userId"] = payload.id;
            // req.userId = user.id; // this is not working because Request interface does not have userId property
            next();
        });
    }
    else {
        res.sendStatus(401);
    }
}
exports.default = authorization;
