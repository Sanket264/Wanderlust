const express=require("express");
const router=express.Router();

//index route
router.get("/",(req,res)=>{
    res.send("This is a index route for posts");
});

//show route
router.get("/:id",(req,res)=>{
    res.send("This is a show route for posts");
});

//create route
router.post("/",(req,res)=>{
    res.send("This is a create route for posts");
});

//delete route
router.delete("/:id",(req,res)=>{
    res.send("This is a delete route for posts");
});


module.exports=router;