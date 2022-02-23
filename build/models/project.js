"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Project = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
var mongoose_unique_validator_1 = __importDefault(require("mongoose-unique-validator"));
var ProjectSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    tags: {
        type: Array,
        required: false,
    },
    gitHubLink: {
        type: String,
        required: false,
    },
    image: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Image",
    },
    date: {
        type: Date,
        required: false,
    },
});
ProjectSchema.set("toJSON", {
    transform: function (document, returnedObject) {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    },
});
ProjectSchema.plugin(mongoose_unique_validator_1.default);
ProjectSchema.statics.build = function (attr) { return new Project(attr); };
var Project = mongoose_1.default.model("Project", ProjectSchema);
exports.Project = Project;
