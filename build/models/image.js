"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Image = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
var mongoose_unique_validator_1 = __importDefault(require("mongoose-unique-validator"));
var imageSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true,
    },
    img: {
        type: Buffer,
        required: true,
    },
    imgType: {
        type: String,
        required: true,
    },
});
imageSchema.set("toJSON", {
    transform: function (_, returnedObject) {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    },
});
imageSchema.plugin(mongoose_unique_validator_1.default);
imageSchema.statics.build = function (attr) { return new Image(attr); };
var Image = mongoose_1.default.model("Image", imageSchema);
exports.Image = Image;
