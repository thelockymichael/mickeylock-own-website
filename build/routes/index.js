"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginRouter = exports.websiteRouter = exports.projectRouter = exports.userRouter = void 0;
var user_1 = require("./user");
Object.defineProperty(exports, "userRouter", { enumerable: true, get: function () { return user_1.userRouter; } });
var project_1 = require("./project");
Object.defineProperty(exports, "projectRouter", { enumerable: true, get: function () { return project_1.projectRouter; } });
var website_1 = require("./website");
Object.defineProperty(exports, "websiteRouter", { enumerable: true, get: function () { return website_1.websiteRouter; } });
var login_1 = require("./login");
Object.defineProperty(exports, "loginRouter", { enumerable: true, get: function () { return login_1.loginRouter; } });