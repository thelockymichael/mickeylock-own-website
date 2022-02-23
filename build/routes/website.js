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
exports.websiteRouter = void 0;
var express_1 = __importDefault(require("express"));
var models_1 = require("../models");
// File filter
var fileFilter_1 = require("../utils/fileFilter");
// Image file UPLOAD import
var multer_1 = __importDefault(require("multer"));
// import { makeThumbnail } from "../utils/resize";
var auth_1 = require("../utils/auth");
var image_1 = require("../models/image");
var resize_1 = require("../utils/resize");
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
exports.websiteRouter = router;
// 1. Get website data
router.get("/", function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var website, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, models_1.Website.findOne({})
                        .populate("selectedProfileImg")
                        .populate("uploadedImgs")
                        .populate("projects")];
            case 1:
                website = _a.sent();
                return [2 /*return*/, website ? res.status(200).send(website) : res.status(404).end()];
            case 2:
                error_1 = _a.sent();
                next(error_1);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
// 2. Get Binary Data from selectedProfileImg
router.get("/selectedProfileImg", function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var website, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, models_1.Website.findOne({}).populate("selectedProfileImg")];
            case 1:
                website = _a.sent();
                return [2 /*return*/, website ? res.status(200).send(website) : res.status(404).end()];
            case 2:
                error_2 = _a.sent();
                next(error_2);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
// 3. Get Binary Data from uploadedImgs
router.get("/uploadedImgs", function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var website, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, models_1.Website.findOne({}).populate("uploadedImgs")];
            case 1:
                website = _a.sent();
                return [2 /*return*/, website ? res.status(200).send(website) : res.status(404).end()];
            case 2:
                error_3 = _a.sent();
                next(error_3);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
// Initialize website for the first time
router.post("/", function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var findWebsite, website, _a, message;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 3, , 4]);
                return [4 /*yield*/, models_1.Website.findOne({})];
            case 1:
                findWebsite = _b.sent();
                if (findWebsite) {
                    // Validate jwt token
                    (0, auth_1.validateToken)(req, res);
                }
                website = models_1.Website.build({
                    name: "Michael Lock",
                    descText: "Mobile Apps || Fullstack",
                    aboutText: "Hello everybody",
                    uploadedImgs: [],
                    projects: [],
                });
                return [4 /*yield*/, website.save()];
            case 2:
                _b.sent();
                return [2 /*return*/, res.status(200).send(website)];
            case 3:
                _a = _b.sent();
                message = _a.message;
                res.status(401).json({
                    user: null,
                    error: message,
                });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
router.put("/", upload.single("selectedProfileImg"), function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var updateWebsite, multerFile, finalImg, newImage, website, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 6, , 7]);
                // Validate jwt token
                (0, auth_1.validateToken)(req, res);
                console.log("req.body ADS-123", req.body);
                updateWebsite = req.body;
                multerFile = req.file;
                console.log("request.file", multerFile);
                return [4 /*yield*/, (0, resize_1.saveImage)(multerFile)];
            case 1:
                finalImg = _a.sent();
                newImage = void 0;
                console.log("1. finalImg", finalImg === null || finalImg === void 0 ? void 0 : finalImg.name);
                if (!finalImg) return [3 /*break*/, 4];
                return [4 /*yield*/, image_1.Image.build(finalImg)];
            case 2:
                newImage = _a.sent();
                return [4 /*yield*/, newImage.save()];
            case 3:
                _a.sent();
                _a.label = 4;
            case 4: return [4 /*yield*/, models_1.Website.findOneAndUpdate({
                    $query: "",
                }, __assign(__assign({}, updateWebsite), { $push: {
                        uploadedImgs: newImage,
                    }, selectedProfileImg: newImage }), { new: true }).populate("selectedProfileImg")];
            case 5:
                website = _a.sent();
                return [2 /*return*/, website
                        ? res.status(200).json({
                            code: 200,
                            message: "Website updated",
                            updatedWebsite: website,
                        })
                        : res.status(404).end()];
            case 6:
                error_4 = _a.sent();
                next(error_4);
                return [3 /*break*/, 7];
            case 7: return [2 /*return*/];
        }
    });
}); });
router.get("/uploaded/images", function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var website, error_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                // Validate jwt token
                (0, auth_1.validateToken)(req, res);
                return [4 /*yield*/, models_1.Website.findOne({})];
            case 1:
                website = _a.sent();
                return [2 /*return*/, website
                        ? res.status(200).send(website.uploadedImgs)
                        : res.status(404).end()];
            case 2:
                error_5 = _a.sent();
                next(error_5);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
router.delete("/uploaded/images/:id", function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var id, updatedWebsite, error_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                // Validate jwt token
                (0, auth_1.validateToken)(req, res);
                id = req.params.id;
                return [4 /*yield*/, image_1.Image.findByIdAndRemove(id)];
            case 1:
                _a.sent();
                return [4 /*yield*/, models_1.Website.findOneAndUpdate({
                        $query: "",
                    }, {
                        $pull: {
                            uploadedImgs: {
                                $in: [id],
                            },
                        },
                    }, { new: true })];
            case 2:
                updatedWebsite = _a.sent();
                return [2 /*return*/, updatedWebsite
                        ? res.status(200).json({
                            code: 200,
                            message: "Image is deleted.",
                            updatedWebsite: updatedWebsite,
                        })
                        : res.status(404).end()];
            case 3:
                error_6 = _a.sent();
                next(error_6);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
router.put("/uploaded/images/:id", function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var id, replaceImage, updatedWebsite, error_7;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                // Validate jwt token
                (0, auth_1.validateToken)(req, res);
                id = req.params.id;
                return [4 /*yield*/, image_1.Image.findById(id)];
            case 1:
                replaceImage = _a.sent();
                return [4 /*yield*/, models_1.Website.findOneAndUpdate({
                        $query: "",
                    }, {
                        selectedProfileImg: replaceImage,
                    }, { new: true })];
            case 2:
                updatedWebsite = _a.sent();
                return [2 /*return*/, updatedWebsite
                        ? res.status(200).json({
                            code: 200,
                            message: "Profile image is now updated.",
                            updatedWebsite: updatedWebsite,
                        })
                        : res.status(404).end()];
            case 3:
                error_7 = _a.sent();
                next(error_7);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
