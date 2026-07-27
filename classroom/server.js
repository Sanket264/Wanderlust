const express = require("express");
const app = express();
const users = require("./routes/users.js");
const posts = require("./routes/posts.js");
const session=require("express-session");
const flash=require("connect-flash");
const path=require("path");

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));

app.use(session({secret:"mysecretkey",resave:false,saveUninitialized:true}));
app.use(flash());

app.get("/register",(req,res)=>{
    let {name="anonymous"}=req.query;
    req.session.name=name;
    
    
    if(req.session.name==="anonymous"){
        req.flash("success","User not registered successfully!");
    }
    else{
        req.flash("error","User registered successfully!");
    }
    res.redirect("/hello");
});

app.get("/hello",(req,res)=>{
    res.locals.successMsg=req.flash("success");
    res.locals.errorMsg=req.flash("error");
    res.render("page.ejs",{name:req.session.name});
});
// app.get("/reqcount",(req,res)=>{
//     if( req.session.count){
//         req.session.count++;
//     }
//     else{
//         req.session.count=1;
//     };
//     res.send(`you sent a request ${req.session.count} times`);
// });
// const cookieParser = require("cookie-parser");

// app.use(cookieParser("secretcode"));   // Register first

// app.use("/users", users);
// app.use("/posts", posts);

// app.get("/getsignedcookies", (req, res) => {
//     res.cookie("madein", "india",{signed:true});
//     res.send("signed cookies are sent");
// });

// app.get("/", (req, res) => {
//     console.dir(req.cookies);
//     res.send("Hi, I am root node");
// });

app.listen(3000, () => {
    console.log("Listening on port 3000");
});