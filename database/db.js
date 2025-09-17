import mongoose from "mongoose";


export const connectDB = async() =>{
    mongoose.connect(process.env.MONGO_URI,{
        dbName: "Library_managementSystem"
    })
    .then(()=>{
        console.log("Database connected successfully")
    })
    .catch((err)=>{
        console.log("error in connecting to db",err);
    });
};





