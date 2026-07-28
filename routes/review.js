const express=require("express");
const router=express.Router({mergeParams:true});
const wrapAsync=require("../utils/wrapAsync.js");
const ExpressError=require("../utils/ExpressError.js");
const Review=require("../models/review.js");
const Listing = require("../models/listing.js");
const {validReview, isLoggedIn,isAuthor}=require("../middleware.js")
const reviewController=require("../controllers/reviews.js")

//review
//post review route
router.post("/",isLoggedIn,validReview,wrapAsync(reviewController.createReview));

//delete review route
router.delete("/:reviewId",isLoggedIn,isAuthor,wrapAsync(reviewController.destroyReview));

module.exports=router;