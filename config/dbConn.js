const mongoose = require('mongoose');

const connectDB = async () => {
    //console.log(process.env.MONGO_URL)
    try {
        await mongoose.connect(process.env.MONGO_URL, {
            useUnifiedTopology: true,
            useNewUrlParser: true
        });
    } catch (err) {
        console.error(err);
    }
}

module.exports = connectDB