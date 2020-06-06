import { Request, Response, NextFunction } from 'express';
import sharp from 'sharp';

import deleteUploadedImage from './deleteUploadedImage';

const resizeImage = (request: Request, response: Response, next: NextFunction) => {
  const inputFile = request.file.path;
  const outputFile = inputFile.split('.').join('-resized.');
  sharp(inputFile)
    .resize(120, 110)
    .toFile(outputFile)
    .then(file => {
      deleteUploadedImage(inputFile);
      request.file.path = outputFile;
      request.file.filename = request.file.filename.split('.').join('-resized.');
      return next();
    })
    .catch(error => {
      return response.status(500).json({error:`Resize image error. ${error.message}.`});
    });
  
};

export default resizeImage;