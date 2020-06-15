import express from 'express';
import multer from 'multer';
import { celebrate, Joi } from 'celebrate';

import PointController from './controllers/PointsController';
import ItemController from './controllers/itemsController';
import Location from './controllers/LocationController';
import pointCreateSchema from './validations/pointCreateSchema';
import multerConfig from './config/multer';
import resizeImage from './utils/resizeImage';


const routes = express.Router();
const pointController = new PointController();
const itemController = new ItemController();
const location = new Location();

const upload = multer(multerConfig);

routes.get('/items', itemController.index);

routes.post(
  '/points',
  upload.single('image'),
  celebrate(
    {
      //Validação dos dados enviado por FormData 
      body: pointCreateSchema,
    }, 
    {
      abortEarly: false
    }
  ),
  resizeImage,
  pointController.create
);

routes.get('/points/', pointController.index);
routes.get('/points/:id', pointController.show);
routes.get('/location/', location.index);

export default routes;