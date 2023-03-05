const Review =require("../models/reviews");
const ExpressError= require("../../utils/errors/ExpressError");
const catchAsync=require("../../utils/errors/catchAsync");
const Stay =require("../models/stay");
const validatestayJoiSchema= require("../../utils/JoiSchema/validateCampgroundJoiSchema");
const validateReviewJoiSchema=require("../../utils/JoiSchema/validateReviewJoiSchema");



const express= require("express")
const router= express.Router();

const {isLoggedIn}=require("../../middleware/isLoggedIn")
const {isReviewAuthorized}=require("../../middleware/isReviewAuthorized");







//Delete a stay's review by it's id
router.delete("/stays/:id/reviews/:revId",isLoggedIn,isReviewAuthorized,catchAsync(async(req,res,next)=>{
    const stay= await Stay.findById(req.params.id);
    const review= await Review.findById(req.params.revId);

    //stay.findByIdAndUpdate(id,{$pull:{reviews:revId}});  // remove the value provided from the array
    //Review.findByIdAndDelete(reviewId)

    // console.log("remove request: ",req.params.revId)
    // console.log("remove request review selected: ",review)
    // console.log("before removing: ",stay.reviews)

    stay.reviews=stay.reviews.filter((arrReview)=>{
        return arrReview.toString()!==review._id.toString()
    })

    console.log("After removing: ",stay.reviews);
    
    await stay.save()
    //r1= await Review.deleteOne({"id":review.id})
    const r2= await Review.findOneAndDelete({"_id":review._id}) //note deleteOne do not trigger a middleware so we need to use findOneAndDelete
    
    console.log("Deleted review: ",r2._id);

    req.flash("success","Successfully deleted the review");
    res.redirect("/stays/"+stay.id)
}))



// submit form for reviews on a particular stay

router.post("/stays/:id/reviews",isLoggedIn,validateReviewJoiSchema,catchAsync(async(req,res,next)=>{
    const stay= await Stay.findById(req.params.id);
    const review=await new Review(req.body.review)
    review.author=req.user._id;
    stay.reviews.push(review)
    await stay.save();
    await review.save();
    console.log("List of reviews when new rev is created: ",stay.reviews)
    req.flash("success","Successfully created a new review");
    res.redirect("/stays/"+req.params.id);
}))



module.exports=router;