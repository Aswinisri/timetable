import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
 const connectDB= async() => {
    try{
        await mongoose
        .connect(process.env.MONGO_URI,{
            useUnifiedTopology:true,
            useNewUrlParser:true,
        })
        .then(()=>{
            console.log(`MongoDB connected`);
        })
        .catch((err) => {
            console.error("Error connecting to mongo",err);
        })
    } catch(error){
        console.error(`Error:${error.message}`);
        process.exit(1);
    }
 };

 export default connectDB;

 const connectionDB=() =>{
    try{
        mongoose.connect(MONGO_URI,

            {
                useUnifiedTopology:true,
                useNewUrlParser:true,
            }

        ).then(()=>{
            console.log(`mongoDB Connected`);
        }).catch((err)=>{
            console.error("Error connecting to mongo",err);
        });
        
    }catch(error){
        console.error(`Error:${error.message}`);
        process.exit(1);
    }
 };