"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
var mongoose_unique_validator_1 = __importDefault(require("mongoose-unique-validator"));
var userSchema = new mongoose_1.default.Schema({
    fullName: {
        type: String,
        required: true,
        unique: true,
    },
    passwordHash: {
        type: String,
        required: true,
    },
    about: {
        type: String,
        required: false,
    },
    profileImage: {
        type: String,
        required: false,
    },
    projects: [
        {
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: "Project",
        },
    ],
});
userSchema.set("toJSON", {
    transform: function (document, returnedObject) {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
        // the hashed password should not be revealed
        delete returnedObject.passwordHash;
    },
});
userSchema.plugin(mongoose_unique_validator_1.default);
userSchema.statics.build = function (attr) { return new User(attr); };
var User = mongoose_1.default.model("User", userSchema);
exports.User = User;
