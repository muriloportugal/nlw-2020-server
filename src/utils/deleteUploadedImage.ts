import fs from 'fs';

const deleteUploadedImage = (filePath:string): boolean => {
  fs.unlink(filePath,(err) =>{
    if(err) {
      return false;
    }
  });
  return true;
};

export default deleteUploadedImage;