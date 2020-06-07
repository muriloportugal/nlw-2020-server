"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var path_1 = __importDefault(require("path"));
var cors_1 = __importDefault(require("cors"));
var celebrate_1 = require("celebrate");
var routes_1 = __importDefault(require("./routes"));
var deleteUploadedImage_1 = __importDefault(require("./utils/deleteUploadedImage"));
var app = express_1.default();
app.use(cors_1.default());
app.use(express_1.default.json());
app.use(routes_1.default);
var uploadFolder = path_1.default.resolve(__dirname, '..', 'uploads');
app.use('/uploads', express_1.default.static(uploadFolder));
String.prototype.replaceAll = function (de, para) {
    var str = this;
    var pos = str.indexOf(de);
    while (pos > -1) {
        str = str.replace(de, para);
        pos = str.indexOf(de);
    }
    return String(str);
};
// Lida com o retorno dos erros de validação do celebrate
app.use(function (
// O parâmetro error pode ser do tipo CelebrateInternalError quando for um
// erro gerado pelos testes do celebrate ou ser do tipo Erro para os demais erros
error, request, response, next) {
    if (celebrate_1.isCelebrate(error)) {
        //Deleta a imagem em caso de erro, pois o point não foi criado.
        deleteUploadedImage_1.default(path_1.default.resolve(uploadFolder, request.file.filename));
        var message = error.joi.message.replaceAll('"', '');
        return response.status(400).json({ error: message });
    }
    return response.status(500).send(error);
});
var port = process.env.PORT || 3333;
app.listen(port, function () { return console.log("listen on port " + port); });
