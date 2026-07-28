const express=require("express");
const router=express.Router();
const wrapAsync=require("../utils/wrapAsync.js");
const listingController=require("../controllers/listings.js");
const Listing=require("../models/listing.js");
const{isLoggedIn,isOwner,validSchema}=require("../middleware.js");

//index route
router.get("/",wrapAsync(listingController.index));

//new route
router.get("/new", isLoggedIn,listingController.renderNewForm);
//show route
router.get("/:id",  wrapAsync(listingController.showListing));
//create route
router.post("/",isLoggedIn,validSchema,wrapAsync (listingController.createListing));

//edit route
router.get("/:id/edit",isLoggedIn,isOwner,wrapAsync (listingController.renderEditForm));

//update route
router.put("/:id",isLoggedIn,isOwner,wrapAsync (listingController.updateListing));
//delete route
router.delete("/:id",isLoggedIn,isOwner,wrapAsync(listingController.destroyListing));

module.exports=router;