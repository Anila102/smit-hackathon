const mongoose = require('mongoose');
// const mongoURI="mongodb://127.0.0.1:27017/test"
const mongoURI="mongodb+srv://anilajawed:tpAbcGy1ULmSi1JT@cluster0.bwhdbvx.mongodb.net/test"

// mongoose.set("strictQuery", false);

const connectToMongo=()=>{
    try{

        mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => console.log('Connected to database'))
        .catch(error => console.error(error));
    }
    catch(err){
        console.log
    }
}
module.exports =connectToMongo;
