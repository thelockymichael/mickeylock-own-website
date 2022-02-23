"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var path_1 = __importDefault(require("path"));
var mongoose_1 = __importDefault(require("mongoose"));
var config_1 = __importDefault(require("./utils/config"));
// Middleware
var middlware_1 = require("./utils/middlware");
var routes_1 = require("./routes");
var app = (0, express_1.default)();
var options = {
    credentials: true,
    origin: true,
};
app.use((0, cors_1.default)(options));
app.use(express_1.default.static(path_1.default.join(__dirname, "../client/build")));
/* FOR IMAGES */
app.use("/thumbnails", express_1.default.static("thumbnails"));
app.use(express_1.default.static("uploads"));
/* END */
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
// Middleware
app.use(middlware_1.requestLogger);
mongoose_1.default
    .connect(config_1.default.MONGO_URI)
    .then(function (result) {
    console.log("connected to MongoDB");
})
    .catch(function (error) {
    console.log("error connecting to MongoDB:", error.message);
});
app.use(function (req, res, next) {
    var _a;
    if (process.env.NODE_ENV === "production") {
        if (((_a = req.headers.host) === null || _a === void 0 ? void 0 : _a.slice(0, 4)) === "www.") {
            var newHost = req.headers.host.slice(4);
            return res.redirect(301, "https://" + newHost + req.originalUrl);
        }
        if (req.headers.host === "https://heroku-base-app-attempt-02.herokuapp.com/")
            return res.redirect(301, "https://www.mickeylock.com");
        if (req.headers["x-forwarded-proto"] !== "https")
            return res.redirect("https://" + req.headers.host + req.url);
        else
            return next();
    }
    else
        return next();
});
// TODO
// START HERE
// TODO
// User registration / login
// Website router
app.use("/api/website", routes_1.websiteRouter);
// User router
app.use("/api/user", routes_1.userRouter);
// Login router
app.use("/api/login", routes_1.loginRouter);
// Project router
app.use("/api/website/projects", routes_1.projectRouter);
// All other GET requests not handled will return to our React app
app.get("*", function (req, res) {
    res.sendFile(path_1.default.resolve(__dirname, "../client/build", "index.html"));
});
// Handle requests with unknown endpoint
app.use(middlware_1.unknownEndpoint);
// Last loaded middleware
app.use(middlware_1.errorHandler);
exports.default = app;
