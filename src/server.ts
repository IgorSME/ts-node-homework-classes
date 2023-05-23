import mongoose from "mongoose";
import App from "./app";

const { DB_HOST, PORT = 3000 } = process.env;

if (!DB_HOST) {
  throw new Error('DB_HOST is not set');
}

mongoose
  .connect(DB_HOST)
  .then(() =>{
    const app = new App();
    app.getApp().listen(PORT,()=>{
      console.log(`Server running. Use our API on port: ${PORT}`);
    })
  }
    
  )
  .catch((error:Error) => {
    console.log(error.message);
    process.exit(1);
  });
