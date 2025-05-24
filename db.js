const mongoose = require("mongoose");

const connectDB = async () => {
    try{
        await mongoose.connect("mongodb+srv://mern_user:mernpass123@cluster0.089zzrs.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");
        console.log("Connected Booyah!!!");
    }
    catch (err) {
        console.error(err.message);
        process.exit(1);
    }

};

module.exports = connectDB;