"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var multer_1 = __importDefault(require("multer"));
var celebrate_1 = require("celebrate");
var PointsController_1 = __importDefault(require("./controllers/PointsController"));
var itemsController_1 = __importDefault(require("./controllers/itemsController"));
var pointCreateSchema_1 = __importDefault(require("./validations/pointCreateSchema"));
var multer_2 = __importDefault(require("./config/multer"));
var resizeImage_1 = __importDefault(require("./utils/resizeImage"));
var routes = express_1.default.Router();
var pointController = new PointsController_1.default();
var itemController = new itemsController_1.default();
var upload = multer_1.default(multer_2.default);
routes.get('/items', itemController.index);
routes.post('/points', upload.single('image'), celebrate_1.celebrate({
    //Validação dos dados enviado por FormData 
    body: pointCreateSchema_1.default,
}, {
    abortEarly: false
}), resizeImage_1.default, pointController.create);
routes.get('/points/', pointController.index);
routes.get('/points/:id', pointController.show);
exports.default = routes;
