const mongoose=require("mongoose");
const catchAsync = require("../../utils/errors/catchAsync");
const Review=require("./reviews")

const Schema = mongoose.Schema;

const staySchema=new Schema({
    title:String,
    price:Number,
    description:String,
    location:String,

    images:[{
        url:String,
        filename:String,
    }],

    author:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    reviews: [{

            type:mongoose.Schema.Types.ObjectId,  // reviews will be an array of obj that refer to reviews
            ref:"Review"                   // We ref to the name of the model as we defined.
      
    }]
    
})


staySchema.post("findOneAndDelete",((async function(stay,next){
    if(stay.reviews.length){
        await Review.deleteMany({id:{$in:stay.reviews}})
    }
    next();

})))


module.exports = mongoose.model("Stay", staySchema);
