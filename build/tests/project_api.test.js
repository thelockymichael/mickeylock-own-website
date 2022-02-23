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
describe("creating and editing projects ", function () {
    beforeAll(function () { return __awaiter(void 0, void 0, void 0, function () {
        var newUser;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: 
                // await Website.deleteMany({});
                return [4 /*yield*/, models_1.User.deleteMany({})];
                case 1:
                    // await Website.deleteMany({});
                    _a.sent();
                    return [4 /*yield*/, models_1.Project.deleteMany({})];
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
    describe("create", function () {
        /** POST */
        test("create new project with name and description", function () { return __awaiter(void 0, void 0, void 0, function () {
            var projectsAtStart, authToken, newProject, projectsAtEnd, project;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, helper.projectsInDb()];
                    case 1:
                        projectsAtStart = _a.sent();
                        return [4 /*yield*/, api
                                .post("/api/login")
                                .send({
                                fullName: "root",
                                password: "abc123",
                            })
                                .then(function (response) {
                                authToken = response.body.authToken;
                            })];
                    case 2:
                        _a.sent();
                        newProject = {
                            name: "Veho GO",
                            description: "React Native -mobiilisovellus.",
                        };
                        return [4 /*yield*/, api
                                .post("/api/website/projects")
                                .send(newProject)
                                .set("Authorization", "bearer " + authToken)
                                .expect(200)
                                .expect("Content-Type", /application\/json/)];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, helper.projectsInDb()];
                    case 4:
                        projectsAtEnd = _a.sent();
                        expect(projectsAtEnd).toHaveLength(projectsAtStart.length + 1);
                        project = projectsAtEnd.map(function (u) { return u.name; });
                        expect(project).toContain(newProject.name);
                        return [2 /*return*/];
                }
            });
        }); });
        test("create new project with name, description, tags, date and gitHubLink", function () { return __awaiter(void 0, void 0, void 0, function () {
            var projectsAtStart, authToken, newProject, projectsAtEnd, project;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, helper.projectsInDb()];
                    case 1:
                        projectsAtStart = _a.sent();
                        return [4 /*yield*/, api
                                .post("/api/login")
                                .send({
                                fullName: "root",
                                password: "abc123",
                            })
                                .then(function (response) {
                                authToken = response.body.authToken;
                            })];
                    case 2:
                        _a.sent();
                        newProject = {
                            name: "Veho GO",
                            description: "React Native -mobiilisovellus.",
                            tags: ["React", "Firebase"],
                            gitHubLink: "https://github.com/Vehonaattorit/VEHOGO",
                            date: new Date(),
                        };
                        return [4 /*yield*/, api
                                .post("/api/website/projects")
                                .send(newProject)
                                .set("Authorization", "bearer " + authToken)
                                .expect(200)
                                .expect("Content-Type", /application\/json/)];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, helper.projectsInDb()];
                    case 4:
                        projectsAtEnd = _a.sent();
                        expect(projectsAtEnd).toHaveLength(projectsAtStart.length + 1);
                        project = projectsAtEnd.map(function (u) { return u.name; });
                        expect(project).toContain(newProject.name);
                        return [2 /*return*/];
                }
            });
        }); });
        test("create new project with image, name, description, tags, date and gitHubLink", function () { return __awaiter(void 0, void 0, void 0, function () {
            var projectsAtStart, authToken, img, newProject, projectsAtEnd, project;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, helper.projectsInDb()];
                    case 1:
                        projectsAtStart = _a.sent();
                        return [4 /*yield*/, api
                                .post("/api/login")
                                .send({
                                fullName: "root",
                                password: "abc123",
                            })
                                .then(function (response) {
                                authToken = response.body.authToken;
                            })];
                    case 2:
                        _a.sent();
                        img = path_1.default.resolve(__dirname, "./dummy-img/angry-resized.png");
                        newProject = {
                            name: "AR Travel",
                            description: "AR-tekniikkaa hyödyntä kännykkäsovellus.",
                            tags: ["Android", "ARCore", "Google"],
                            gitHubLink: "https://github.com/Vehonaattorit/VEHOGO",
                            date: new Date(),
                        };
                        return [4 /*yield*/, api
                                .post("/api/website/projects")
                                .set("Authorization", "bearer " + authToken)
                                .field("name", newProject.name)
                                .field("description", newProject.description)
                                .field("tags", newProject.tags)
                                .field("gitHubLink", newProject.gitHubLink)
                                .field("date", newProject.date.toISOString())
                                .attach("image", img)
                                .expect(200)
                                .expect("Content-Type", /application\/json/)];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, helper.projectsInDb()];
                    case 4:
                        projectsAtEnd = _a.sent();
                        expect(projectsAtEnd).toHaveLength(projectsAtStart.length + 1);
                        project = projectsAtEnd.map(function (u) { return u.name; });
                        expect(project).toContain(newProject.name);
                        return [2 /*return*/];
                }
            });
        }); });
        /** END POST */
    });
    describe("update", function () {
        /** PUT */
        test("update a project with new name and description", function () { return __awaiter(void 0, void 0, void 0, function () {
            var projectsAtStart, authToken, projectId, updateProject, projectsAtEnd;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, helper.projectsInDb()];
                    case 1:
                        projectsAtStart = _a.sent();
                        return [4 /*yield*/, api
                                .post("/api/login")
                                .send({
                                fullName: "root",
                                password: "abc123",
                            })
                                .then(function (response) {
                                authToken = response.body.authToken;
                            })];
                    case 2:
                        _a.sent();
                        projectId = projectsAtStart[0].id;
                        updateProject = {
                            id: projectId,
                            name: "Haunted House",
                            description: "React Nativella tehty sovellus.",
                        };
                        return [4 /*yield*/, api
                                .put("/api/website/projects")
                                .send(updateProject)
                                .set("Authorization", "bearer " + authToken)
                                .expect(200)
                                .expect("Content-Type", /application\/json/)];
                    case 3:
                        _a.sent();
                        console.log("projectId [0]", projectsAtStart[0].id);
                        return [4 /*yield*/, helper.projectsInDb()];
                    case 4:
                        projectsAtEnd = _a.sent();
                        console.log("projectId [0] end", projectsAtEnd[0].id);
                        expect(projectsAtEnd).toHaveLength(projectsAtStart.length);
                        expect(projectsAtEnd[0].name).toContain(updateProject.name);
                        expect(projectsAtEnd[0].description).toContain(updateProject.description);
                        return [2 /*return*/];
                }
            });
        }); });
        test("update a project with new name, description, tags, date and gitHubLink", function () { return __awaiter(void 0, void 0, void 0, function () {
            var projectsAtStart, authToken, projectId, updateProject, projectsAtEnd;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, helper.projectsInDb()];
                    case 1:
                        projectsAtStart = _a.sent();
                        return [4 /*yield*/, api
                                .post("/api/login")
                                .send({
                                fullName: "root",
                                password: "abc123",
                            })
                                .then(function (response) {
                                authToken = response.body.authToken;
                            })];
                    case 2:
                        _a.sent();
                        projectId = projectsAtStart[0].id;
                        updateProject = {
                            id: projectId,
                            name: "EasyDiary",
                            description: "Facebook-looking website created in vanilla JavaScript.",
                            tags: ["JavaScript", "NodeJS", "MariaDB"],
                            gitHubLink: "https://google.com",
                            date: new Date(),
                        };
                        return [4 /*yield*/, api
                                .put("/api/website/projects")
                                .send(updateProject)
                                .set("Authorization", "bearer " + authToken)
                                .expect(200)
                                .expect("Content-Type", /application\/json/)];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, helper.projectsInDb()];
                    case 4:
                        projectsAtEnd = _a.sent();
                        expect(projectsAtEnd).toHaveLength(projectsAtStart.length);
                        expect(projectsAtEnd[0].name).toContain(updateProject.name);
                        expect(projectsAtEnd[0].description).toContain(updateProject.description);
                        expect(projectsAtEnd[0].tags).toEqual(updateProject.tags);
                        return [2 /*return*/];
                }
            });
        }); });
        test("update a project with new image, name, description, tags, date and gitHubLink", function () { return __awaiter(void 0, void 0, void 0, function () {
            var projectsAtStart, authToken, projectId, updateProject, projectsAtEnd;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, helper.projectsInDb()];
                    case 1:
                        projectsAtStart = _a.sent();
                        return [4 /*yield*/, api
                                .post("/api/login")
                                .send({
                                fullName: "root",
                                password: "abc123",
                            })
                                .then(function (response) {
                                authToken = response.body.authToken;
                            })];
                    case 2:
                        _a.sent();
                        projectId = projectsAtStart[0].id;
                        updateProject = {
                            id: projectId,
                            name: "EasyDiary",
                            description: "Facebook-looking website created in vanilla JavaScript.",
                            tags: ["JavaScript", "NodeJS", "MariaDB"],
                            gitHubLink: "https://google.com",
                            date: new Date(),
                        };
                        return [4 /*yield*/, api
                                .put("/api/website/projects")
                                .send(updateProject)
                                .set("Authorization", "bearer " + authToken)
                                .expect(200)
                                .expect("Content-Type", /application\/json/)];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, helper.projectsInDb()];
                    case 4:
                        projectsAtEnd = _a.sent();
                        expect(projectsAtEnd).toHaveLength(projectsAtStart.length);
                        expect(projectsAtEnd[0].name).toContain(updateProject.name);
                        expect(projectsAtEnd[0].description).toContain(updateProject.description);
                        expect(projectsAtEnd[0].tags).toEqual(updateProject.tags);
                        expect(projectsAtEnd[0].gitHubLink).toContain(updateProject.gitHubLink);
                        expect(projectsAtEnd[0].date).toEqual(updateProject.date);
                        return [2 /*return*/];
                }
            });
        }); });
        test("create new project with image, name, description, tags, date and gitHubLink", function () { return __awaiter(void 0, void 0, void 0, function () {
            var projectsAtStart, authToken, img, projectId, updateProject, projectsAtEnd;
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, helper.projectsInDb()];
                    case 1:
                        projectsAtStart = _c.sent();
                        return [4 /*yield*/, api
                                .post("/api/login")
                                .send({
                                fullName: "root",
                                password: "abc123",
                            })
                                .then(function (response) {
                                authToken = response.body.authToken;
                            })];
                    case 2:
                        _c.sent();
                        img = path_1.default.resolve(__dirname, "./dummy-img/angry-resized.png");
                        projectId = projectsAtStart[1].id ? projectsAtStart[1].id : "";
                        updateProject = {
                            id: projectId,
                            name: "CoffeeShop",
                            description: "CoffeeShop mobile app and website.",
                            tags: ["Flutter", "Mocha", "PostgreSQL"],
                            gitHubLink: "https://github.com/Vehonaattorit/VEHOGO",
                            date: new Date(),
                        };
                        return [4 /*yield*/, api
                                .put("/api/website/projects")
                                .set("Authorization", "bearer " + authToken)
                                .field("id", updateProject.id)
                                .field("name", updateProject.name)
                                .field("description", updateProject.description)
                                .field("tags", updateProject.tags)
                                .field("gitHubLink", updateProject.gitHubLink)
                                .field("date", updateProject.date.toISOString())
                                .attach("image", img)
                                .expect(200)
                                .expect("Content-Type", /application\/json/)];
                    case 3:
                        _c.sent();
                        return [4 /*yield*/, helper.projectsInDb()];
                    case 4:
                        projectsAtEnd = _c.sent();
                        expect(projectsAtEnd).toHaveLength(projectsAtStart.length);
                        expect(projectsAtEnd[1].name).toContain(updateProject.name);
                        expect(projectsAtEnd[1].description).toContain(updateProject.description);
                        expect(projectsAtEnd[1].tags).toEqual(updateProject.tags);
                        expect(projectsAtEnd[1].gitHubLink).toContain(updateProject.gitHubLink);
                        expect(projectsAtEnd[1].date).toEqual(updateProject.date);
                        // TODO
                        // Get IMAGE name
                        console.log("projectsAtEnd[1].image?.name", (_a = projectsAtEnd[1].image) === null || _a === void 0 ? void 0 : _a.name);
                        expect((_b = projectsAtEnd[1].image) === null || _b === void 0 ? void 0 : _b.name).toContain("angry-resized.png");
                        return [2 /*return*/];
                }
            });
        }); });
        /** PUT END */
    });
    describe("remove", function () {
        /** PUT */
        test("remove a project", function () { return __awaiter(void 0, void 0, void 0, function () {
            var projectsAtStart, authToken, projectToDelete, projectsAtEnd, names;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, helper.projectsInDb()];
                    case 1:
                        projectsAtStart = _a.sent();
                        return [4 /*yield*/, api
                                .post("/api/login")
                                .send({
                                fullName: "root",
                                password: "abc123",
                            })
                                .then(function (response) {
                                authToken = response.body.authToken;
                            })];
                    case 2:
                        _a.sent();
                        projectToDelete = projectsAtStart[0];
                        return [4 /*yield*/, api
                                .delete("/api/website/projects/" + projectToDelete.id)
                                .set("Authorization", "bearer " + authToken)
                                .expect(200)];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, helper.projectsInDb()];
                    case 4:
                        projectsAtEnd = _a.sent();
                        expect(projectsAtEnd).toHaveLength(projectsAtStart.length - 1);
                        names = projectsAtEnd.map(function (r) { return r.name; });
                        expect(names).not.toContain(projectToDelete.name);
                        return [2 /*return*/];
                }
            });
        }); });
    });
});
afterAll(function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        mongoose_1.default.connection.close();
        return [2 /*return*/];
    });
}); }, 10000);
