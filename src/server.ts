import express, { Request, Response, NextFunction } from 'express';
import path from 'path';
import cors from 'cors'; 
import { isCelebrate, CelebrateInternalError } from 'celebrate';
import cron from 'node-cron';

import routes from './routes';
import deleteUploadedImages from './utils/deleteUploadedImage';
import resetDataBase from './utils/resetDataBase';

//Agenda uma tarefa para apagar os dados das tabelas cadastrados a mais de 10 minutos.
cron.schedule('*/10 * * * *', resetDataBase);

const app = express();
app.use(cors());
app.use(express.json());
app.use(routes);

const uploadFolder = path.join(__dirname,'../','uploads');
app.use('/uploads', express.static(uploadFolder,{ maxAge: 86400000 }));

// Tudo isso pq o JS não tem um replaceAll já implementado...
declare global {
  interface String {
    replaceAll(de: string, para: string): string;
  }
}
String.prototype.replaceAll = function(de: string, para: string){
  var str =  this;
  var pos = str.indexOf(de);
  while (pos > -1){
    str = str.replace(de, para);
    pos = str.indexOf(de);
  }
  return String(str);
}

// Lida com o retorno dos erros de validação do celebrate
app.use((
  // O parâmetro error pode ser do tipo CelebrateInternalError quando for um
  // erro gerado pelos testes do celebrate ou ser do tipo Erro para os demais erros
  error: Error & CelebrateInternalError , 
  request: Request,
  response: Response,
  next: NextFunction
) => {
  console.log('Error Handler');
  //Deleta a imagem em caso de erro, pois o point não foi criado.
  if(isCelebrate(error)) {
  
    if (request.file){
      deleteUploadedImages(path.resolve(uploadFolder,request.file.filename));
    }
    // Se o erro vier do Celebrate limpa a mensagem antes de enviar
    const message = error.joi.message.replaceAll('"','');
    return response.status(400).json({error: message});
  
  }else if(request.file) {
    // Se o erro vier de outra rota só apaga a imagem e envia o a mensagem de erro
    deleteUploadedImages(path.resolve(uploadFolder,request.file.filename));
    return response.status(400).json({error: error.message});
  
  }else if(error.message ==='File too large'){
    // Quando o erro vem do filtro fileSize do multer.
    error.message = 'File too large. Maximum size is 1MB';
    return response.status(400).json({error: error.message});
  }
  console.log(error);
  return response.status(500).send({ error: error });
});

const port = process.env.PORT;
app.listen(port, () => console.log(`listen on port ${port}`));