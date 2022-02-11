"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fileFilter = void 0;
// dont save if not image: (needs to be hoisted, that's why not arrow function)
function fileFilter(_, file, done) {
    console.log("fileFilter", file);
    // The function should call `done` with a boolean
    // To indicate if the file should be accepted
    // To reject this file pass `false`, like so:
    if (!file.mimetype.includes("image")) {
        return done(null, false, new Error("I don't have a clue!"));
    }
    else {
        // To accept the file pass `true`, like so:
        done(null, true);
    }
}
exports.fileFilter = fileFilter;
