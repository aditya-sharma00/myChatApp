const mongoose = require("mongoose")

const connectDB = async()=>{
    try {
        const conn = await mongoose.connect(process.env.MONGO,{
        // useNewUrlParser: true, no longer needed
        // useUnifiedTopology: true, 
         
    }
    
    )
    console.log(`Mongo Connected : ${conn.connection.host}`);
    } catch (error) {
        console.log(`Error occured ${error}`);
    }
}

module.exports = connectDB