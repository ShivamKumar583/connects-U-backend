const mongoose = require('mongoose');

async function connectDB(){
    try{
        await mongoose.connect(process.env.MONGODB_URI)

        const connection = mongoose.connection
        
        connection.on('connected' , () => {
            console.log('Connected to db')
        })

        connection.on('error' , (error) => {
            console.log('Something is wrong in mongodb' , error);
        })

    }catch(err){
        console.log('Something is wrong' , err)
    }
}

module.exports = connectDB