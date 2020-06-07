"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var sharp_1 = __importDefault(require("sharp"));
var deleteUploadedImage_1 = __importDefault(require("./deleteUploadedImage"));
var resizeImage = function (request, response, next) {
    var inputFile = request.file.path;
    var outputFile = inputFile.split('.').join('-resized.');
    sharp_1.default(inputFile)
        .resize(120, 110)
        .toFile(outputFile)
        .then(function (file) {
        deleteUploadedImage_1.default(inputFile);
        request.file.path = outputFile;
        request.file.filename = request.file.filename.split('.').join('-resized.');
        return next();
    })
        .catch(function (error) {
        return response.status(500).json({ error: "Resize image error. " + error.message + "." });
    });
};
exports.default = resizeImage;
