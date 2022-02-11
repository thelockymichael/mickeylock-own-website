"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateToken = exports.getTokenFrom = void 0;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var getTokenFrom = function (request) {
    var authorization = request.get("authorization");
    if (authorization && authorization.toLowerCase().startsWith("bearer")) {
        return authorization.substring(7);
    }
    return null;
};
exports.getTokenFrom = getTokenFrom;
var validateToken = function (req, res) {
    var token = getTokenFrom(req);
    console.log("token", token);
    var decodedToken = jsonwebtoken_1.default.verify(token, process.env.SECRET);
    if (!token || !decodedToken.id) {
        return res.status(401).json({ error: "token missing or invalid" });
    }
};
exports.validateToken = validateToken;
