import { timeStamp } from "console";
import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    url : { type: String, required : true, unique : true},
    currency : { type : String, required : true},
    image : { type : String, required : true},
    title : { type : String, required : true},
    currentPrice : { type : Number, required : true},
    originalPrice : { type : Number, required : true},
    priceHistory : [
        {
            price : { type : Number, required : true},
            date : { type : Date, default : Date.now }
        },
    ],
    lowestPrice : { type : Number, required : true},
    highestPrice : { type : Number, required : true},
    averagePrice : {type: Number,
        default: 0.0},
    discountRate : { type : Number, required : true},
    description : { type: String, default:''},
    category : { type : String, required: true},
    reviewCounts : { type: Number,
        default: 0},
    isOutOfStock : {type: Boolean, default:false},
    users : [
        {email : {type:String, required:true}}
    ], default:[],
}, {timestamps : true});

const Product = mongoose.models.Product || mongoose.model('Product', productSchema);

export default Product;