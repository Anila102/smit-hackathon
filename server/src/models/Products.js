const mongoose = require('mongoose');
const { Schema } = mongoose;

const TasksSchema= new Schema({
    // user:{
    //     type: mongoose.Schema.Types.ObjectId,        
    //     ref: 'product'
    // },
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true,

    },
    price:{
        type:Number,
        required:true,
        
    },
    category:{
        type:String,
        required:true,
        
    },
    date:{
        type:Date,
        default: Date.now
    }
});
module.exports = mongoose.model("products", TasksSchema);