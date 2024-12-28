import dotenv from 'dotenv';
dotenv.config();
import mongoose from 'mongoose';


const URI = process.env.MONGO_URI;


function connect() {
  mongoose.connect(URI)
  .then(() => {
    
    console.log('Database Connected');
  })
  .catch(err => {
    console.log(err);
  });
};

export default connect;