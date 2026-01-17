const mongoose = require('mongoose');

const connectDB = async ()=> {
    await mongoose.connect(
        "mongodb+srv://vedanshm15:tf9Z1tAdNrmRU4AO@namastenode.wkrqyzc.mongodb.net/devTinder"
    );
}

module.exports = connectDB;