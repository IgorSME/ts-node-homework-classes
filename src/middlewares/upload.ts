import multer,{  Multer } from 'multer';
import { Request } from 'express';
import { ICallBack } from '../types/appTypes';
import path from 'path';


const tmpDir:string = path.join(__dirname, "../", "tmp");
console.log('tmpDir', tmpDir);


class MulterConfig{
 private multerConfig:multer.StorageEngine;

 constructor(){
  this.multerConfig = multer.diskStorage({
    destination: this.destination.bind(this),
    filename: this.filename.bind(this)
  })
 }
private destination (req:Request, file:Express.Multer.File, cb:ICallBack):void {
  cb(null, tmpDir);
}
private filename(req:Request, file:Express.Multer.File, cb:ICallBack):void  {
  cb(null, file.originalname);
}

getUpload():Multer{
  return multer({
    storage:this.multerConfig,
    limits:{
      fileSize:2048
    }
  })
}
}

const upload = new MulterConfig().getUpload();


export default  upload;
