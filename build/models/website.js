"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Website = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
var mongoose_unique_validator_1 = __importDefault(require("mongoose-unique-validator"));
var websiteSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
    },
    descText: {
        type: String,
    },
    aboutText: {
        type: String,
    },
    uploadedImgs: {
        type: [String],
    },
    selectedProfileImg: {
        type: String,
    },
    projects: [
        {
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: "Project",
        },
    ],
});
websiteSchema.set("toJSON", {
    transform: function (_, returnedObject) {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    },
});
websiteSchema.plugin(mongoose_unique_validator_1.default);
websiteSchema.statics.build = function (attr) { return new Website(attr); };
var Website = mongoose_1.default.model("Website", websiteSchema);
exports.Website = Website;
