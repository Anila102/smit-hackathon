const mongoose = require('mongoose');
const { Schema } = mongoose;

const OrdersSchema= new Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,        
        ref: 'order'
    },
    product:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    },  
    date:{
        type:Date,
        default: Date.now
    }
});
module.exports = mongoose.model("orders", OrdersSchema);