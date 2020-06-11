import { Request, Response, NextFunction } from 'express';
import sharp from 'sharp';
import fs from 'fs';

import deleteUploadedImage from './deleteUploadedImage';

const resizeImage = (request: Request, response: Response, next: NextFunction) => {
  if (request.file) {
    const inputFile = request.file.path;
    const outputFile = inputFile.split('.').join('-resized.');
    sharp(inputFile)
      .resize(800, 600)
      .toFile(outputFile)
      .then(file => {
        
        if(deleteUploadedImage(inputFile)) {
          fs.rename(outputFile,inputFile, (error) => {
            if(error){
              console.log(`Erro ao renomear imagem ${error}`);
            }
          });
        };
        next();
      })
      .catch(error => {
        return response.status(500).json({error:`Resize image error. ${error.message}.`});
      });
  }
  //return next();
  
};

export default resizeImage;