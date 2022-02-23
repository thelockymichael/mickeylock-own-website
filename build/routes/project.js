"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
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
exports.projectRouter = void 0;
var express_1 = __importDefault(require("express"));
var models_1 = require("../models");
var multer_1 = __importDefault(require("multer"));
var fileFilter_1 = require("../utils/fileFilter");
var resize_1 = require("../utils/resize");
var auth_1 = require("../utils/auth");
require("express-async-errors");
var storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./uploads/");
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    },
});
var upload = (0, multer_1.default)({ storage: storage, fileFilter: fileFilter_1.fileFilter });
var router = express_1.default.Router();
exports.projectRouter = router;
// TODO
// 1. Post NEW Project
// 2. GET NEW PROJECT(s)
// 3. Delete PROJECt
// 4. EDIT PROJECT
router.get("/", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var project;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, models_1.Project.find({}).populate("image")];
            case 1:
                project = _a.sent();
                return [2 /*return*/, res.status(200).send(project)];
        }
    });
}); });
router.get("/:id", function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var id, project;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                return [4 /*yield*/, models_1.Project.findById(id)];
            case 1:
                project = _a.sent();
                // TODO
                // !!! Setup eslint . !!!
                return [2 /*return*/, project ? res.json(project.toJSON()) : res.status(404).end()];
        }
    });
}); });
router.post("/", upload.single("image"), function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var multerFile, finalImg, newImage, tags, project, newProject, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 7, , 8]);
                // Validate jwt token
                (0, auth_1.validateToken)(req, res);
                multerFile = req.file;
                console.log("updateProject", req.body);
                console.log("multerFile", multerFile);
                return [4 /*yield*/, (0, resize_1.saveImage)(multerFile)];
            case 1:
                finalImg = _a.sent();
                newImage = void 0;
                console.log("1. finalImg", finalImg === null || finalImg === void 0 ? void 0 : finalImg.name);
                if (!finalImg) return [3 /*break*/, 4];
                return [4 /*yield*/, models_1.Image.build(finalImg)];
            case 2:
                newImage = _a.sent();
                return [4 /*yield*/, newImage.save()];
            case 3:
                _a.sent();
                _a.label = 4;
            case 4:
                tags = req.body.tags;
                if (typeof tags === "string")
                    tags = JSON.parse(req.body.tags);
                console.log("newTags", tags);
                project = __assign(__assign({}, req.body), { tags: tags, image: newImage });
                return [4 /*yield*/, models_1.Project.build(project)];
            case 5:
                newProject = _a.sent();
                return [4 /*yield*/, newProject.save()];
            case 6:
                _a.sent();
                return [2 /*return*/, newProject
                        ? res.status(200).json({
                            code: 200,
                            message: "New project created.",
                            newProject: newProject,
                        })
                        : res.status(404).end()];
            case 7:
                error_1 = _a.sent();
                next(error_1);
                return [3 /*break*/, 8];
            case 8: return [2 /*return*/];
        }
    });
}); });
router.put("/", upload.single("image"), function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var multerFile, finalImg, newImage, prevProject, tags, updateProject, project, error_2;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 8, , 9]);
                // Validate jwt token
                (0, auth_1.validateToken)(req, res);
                multerFile = req.file;
                console.log("req.body.id", req.body.id);
                console.log("request.file", multerFile);
                return [4 /*yield*/, (0, resize_1.saveImage)(multerFile)];
            case 1:
                finalImg = _b.sent();
                newImage = void 0;
                console.log("1. finalImg", finalImg === null || finalImg === void 0 ? void 0 : finalImg.name);
                if (!finalImg) return [3 /*break*/, 6];
                return [4 /*yield*/, models_1.Project.findById(req.body.id).populate("image")];
            case 2:
                prevProject = _b.sent();
                return [4 /*yield*/, models_1.Image.findByIdAndRemove((_a = prevProject === null || prevProject === void 0 ? void 0 : prevProject.image) === null || _a === void 0 ? void 0 : _a.id)];
            case 3:
                _b.sent();
                return [4 /*yield*/, models_1.Image.build(finalImg)];
            case 4:
                newImage = _b.sent();
                return [4 /*yield*/, newImage.save()];
            case 5:
                _b.sent();
                _b.label = 6;
            case 6:
                tags = req.body.tags;
                if (typeof tags === "string")
                    tags = JSON.parse(req.body.tags);
                updateProject = __assign(__assign({}, req.body), { tags: tags, image: newImage });
                return [4 /*yield*/, models_1.Project.findByIdAndUpdate(updateProject.id, __assign({}, updateProject), { new: true }).populate("image")];
            case 7:
                project = _b.sent();
                return [2 /*return*/, project
                        ? res.status(200).json({
                            code: 200,
                            message: "Project updated",
                            updatedProject: project,
                        })
                        : res.status(404).end()];
            case 8:
                error_2 = _b.sent();
                next(error_2);
                return [3 /*break*/, 9];
            case 9: return [2 /*return*/];
        }
    });
}); });
router.delete("/:id", function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var projectId, deletedProject, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                // Validate jwt token
                (0, auth_1.validateToken)(req, res);
                projectId = req.params.id;
                return [4 /*yield*/, models_1.Project.findByIdAndRemove(projectId)];
            case 1:
                deletedProject = _a.sent();
                return [2 /*return*/, deletedProject
                        ? res.status(200).json({
                            code: 200,
                            message: "Project is deleted.",
                            deletedProject: deletedProject,
                        })
                        : res.status(404).end()];
            case 2:
                error_3 = _a.sent();
                next(error_3);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
router.delete("/images/:id", function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var imageId, deletedImage, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                imageId = req.params.id;
                return [4 /*yield*/, models_1.Image.findByIdAndRemove(imageId)];
            case 1:
                deletedImage = _a.sent();
                return [2 /*return*/, deletedImage
                        ? res.status(200).json({
                            code: 200,
                            message: "Image is deleted.",
                            deletedImage: deletedImage,
                        })
                        : res.status(404).end()];
            case 2:
                error_4 = _a.sent();
                next(error_4);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
