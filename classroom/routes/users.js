const express=require("express");
const router=express.Router();

//index route
router.get("/",(req,res)=>{
    res.send("This is a index route");
});

//show route
router.get("/:id",(req,res)=>{
    res.send("This is a show route");
});

//create route
router.post("/",(req,res)=>{
    res.send("This is a create route");
});

//delete route
router.delete("/:id",(req,res)=>{
    res.send("This is a delete route");
});


module.exports=router;