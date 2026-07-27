const express=require("express");
const router=express.Router();
const wrapAsync=require("../utils/wrapAsync.js");

const Listing=require("../models/listing.js");
const{isLoggedIn,isOwner,validSchema}=require("../middleware.js");

//index route
router.get("/",wrapAsync(async(req,res)=>{
    const allListings=await Listing.find({});
    res.render("listings/index.ejs",{allListings});
}));

//new route
router.get("/new", isLoggedIn,(req,res)=>{
    
    res.render("listings/new.ejs");

});
//show route
router.get("/:id",  wrapAsync(async (req, res) => {
    const { id } = req.params;

    const listing = await Listing.findById(id)
        .populate("owner")
        .populate({
            path: "reviews",
            populate: {
                path: "author",
            },
        });

    if (!listing) {
        req.flash("error", "Listing you requested does not exist!");
        return res.redirect("/listings");
    }

    res.render("listings/show.ejs", { listing });
}));
//create route
router.post("/",isLoggedIn,validSchema,wrapAsync (async(req,res)=>{
    const newListing=new Listing(req.body.listing);
    newListing.owner=req.user._id;
    await newListing.save();
    req.flash("success","New listing created successfully");
    res.redirect("/listings");
    }
    
));

//edit route
router.get("/:id/edit",isLoggedIn,isOwner,wrapAsync (async(req,res)=>{
    let {id} = req.params;
    const listing=await Listing.findById(id);
    if (!listing) {
        req.flash("error", "Listing you requested does not exist!");
        return res.redirect("/listings");
    }
    res.render("listings/edit",{listing});
    
}));

//update route
router.put("/:id",isLoggedIn,isOwner,wrapAsync (async(req,res)=>{
    let {id}=req.params;
    await Listing.findByIdAndUpdate(id, { ...req.body.listing});
    req.flash("success","Listing Updated successfully");
    res.redirect(`/listings/${id}`);
}));

router.delete("/:id",isLoggedIn,isOwner,wrapAsync(async(req,res)=>{
    let {id}=req.params;
    let deletedListing=await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    req.flash("success","Listing Deleted successfully");
    res.redirect("/listings");
}));

module.exports=router;