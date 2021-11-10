"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
var cors_1 = __importDefault(require("cors"));
var path_1 = __importDefault(require("path"));
var app = (0, express_1.default)();
// app.use(cors);
// app.use(express.json());
// app.use(express.urlencoded());
// Serve static client app
// Add a list of allowed origins.
// If you have more origins you would like to add, you can add them to the array below.
var allowedOrigins = ["http://localhost:3000"];
var options = {
    origin: allowedOrigins,
};
app.use((0, cors_1.default)(options));
app.use(express_1.default.static(path_1.default.join(__dirname, "../client/build/")));
console.log("item 01,", path_1.default.join(__dirname, "../client/build/"));
app.use(body_parser_1.default.json());
app.get("/hello", function (req, res) {
    res.send("Hello World !");
});
exports.default = app;
