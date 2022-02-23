"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var supertest_1 = __importDefault(require("supertest"));
var app_1 = __importDefault(require("../app"));
var helper = __importStar(require("./helpers/test_helper"));
var models_1 = require("../models");
var path_1 = __importDefault(require("path"));
// Import image file
// import dummyImage from "./dummy-img/PortfolioPic.jpg";
jest.setTimeout(30000);
var api = (0, supertest_1.default)(app_1.default);
// TODO
// 1. Create a website
// 2. Edit name & descText
// 3. Edit aboutText and upload PROFILE IMG
// => Create DUMMY profile image PortfolioPic2_23.0.1...
describe("creating and editing the website ", function () {
    beforeAll(function () { return __awaiter(void 0, void 0, void 0, function () {
        var newUser;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, models_1.Website.deleteMany({})];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, models_1.User.deleteMany({})];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, models_1.Image.deleteMany({})];
                case 3:
                    _a.sent();
                    newUser = {
                        fullName: "root",
                        about: "Only user",
                        password: "abc123",
                        profileImage: "https://images.unsplash.com/photo-1615789591457-74a63395c990?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8ZG9tZXN0aWMlMjBjYXR8ZW58MHx8MHx8&w=1000&q=80",
                        projects: [],
                    };
                    return [4 /*yield*/, api
                            .post("/api/user/register")
                            .send(newUser)
                            .expect(200)
                            .expect("Content-Type", /application\/json/)];
                case 4:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    test("create a website", function () { return __awaiter(void 0, void 0, void 0, function () {
        var websiteAtStart, newWebsite, websiteAtEnd, website;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, helper.websiteInDb()];
                case 1:
                    websiteAtStart = _a.sent();
                    newWebsite = {
                        name: "Michael Lock",
                        descText: "Mobile Apps || Fullstack",
                        aboutText: "Hello everybody",
                        uploadedImgs: [],
                        selectedProfileImg: "",
                        projects: [],
                    };
                    return [4 /*yield*/, api
                            .post("/api/website/")
                            .send(newWebsite)
                            .expect(200)
                            .expect("Content-Type", /application\/json/)];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, helper.websiteInDb()];
                case 3:
                    websiteAtEnd = _a.sent();
                    expect(websiteAtEnd).toHaveLength(websiteAtStart.length + 1);
                    website = websiteAtEnd.map(function (u) { return u.name; });
                    expect(website).toContain(newWebsite.name);
                    return [2 /*return*/];
            }
        });
    }); });
    test("update name and descText properties of a website", function () { return __awaiter(void 0, void 0, void 0, function () {
        var authToken, updatedWebsite, websiteAtEnd, websiteName, websiteDesc;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, api
                        .post("/api/login")
                        .send({
                        fullName: "root",
                        password: "abc123",
                    })
                        .then(function (response) {
                        authToken = response.body.authToken;
                    })];
                case 1:
                    _a.sent();
                    updatedWebsite = {
                        name: "Mickey Lock",
                        descText: "Frontend || Backend",
                    };
                    return [4 /*yield*/, api
                            .put("/api/website/")
                            .set("Authorization", "bearer " + authToken)
                            .send(updatedWebsite)
                            .expect(200)
                            .expect("Content-Type", /application\/json/)];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, helper.websiteInDb()];
                case 3:
                    websiteAtEnd = _a.sent();
                    expect(websiteAtEnd).toHaveLength(1);
                    websiteName = websiteAtEnd.map(function (u) { return u.name; });
                    websiteDesc = websiteAtEnd.map(function (u) { return u.descText; });
                    expect(websiteName).toContain(updatedWebsite.name);
                    expect(websiteDesc).toContain(updatedWebsite.descText);
                    return [2 /*return*/];
            }
        });
    }); });
    test("update aboutText and upload profile img", function () { return __awaiter(void 0, void 0, void 0, function () {
        var authToken, img, abouText, websiteAtEnd, websiteName;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, api
                        .post("/api/login")
                        .send({
                        fullName: "root",
                        password: "abc123",
                    })
                        .then(function (response) {
                        authToken = response.body.authToken;
                    })];
                case 1:
                    _a.sent();
                    img = path_1.default.resolve(__dirname, "./dummy-img/angry-resized.png");
                    abouText = "Hello everybody!";
                    return [4 /*yield*/, api
                            .put("/api/website/")
                            .set("Authorization", "bearer " + authToken)
                            .field("aboutText", abouText)
                            .attach("selectedProfileImg", img)
                            .expect(200)
                            .expect("Content-Type", /application\/json/)];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, helper.websiteInDb()];
                case 3:
                    websiteAtEnd = _a.sent();
                    expect(websiteAtEnd).toHaveLength(1);
                    websiteName = websiteAtEnd.map(function (u) { return u.aboutText; });
                    expect(websiteName).toContain(abouText);
                    return [2 /*return*/];
            }
        });
    }); });
});
afterAll(function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        mongoose_1.default.connection.close();
        return [2 /*return*/];
    });
}); }, 10000);
