import mongoose from "mongoose"

const ConnectDB = async () => {
 try {
    await mongoose.connect(process.env.MONGO_URI)
    console.log("Mongo DB Connected")
    console.log("DataBase Name:" , mongoose.connection.name );
    
 } catch (error) {
    console.error("Mongo DB connection Error:", error)
    process.exit(1)
 }
    
};
 export default ConnectDB;