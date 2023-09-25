var express = require("express");
var router= express.Router();
var passport = require("passport");
var User = require("../models/user");

//Root Route
router.get("/",function(req,res){
    res.render("landing");
});


//REGISTER Routes

//Show register form
router.get("/register",function(req,res){
    res.render("register");
});

//handle signup logic
router.post("/register",function(req,res){
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err,user){
        if(err){
            req.flash("error",err);
            console.log(err);
            return res.redirect("/register");
        }
        passport.authenticate("local")(req,res,function(){
            res.redirect("/blogs");
        });
    });
});

//LOGIN Routes
//show login form
router.get("/login",function(req,res){
    res.render("login");
});

//handle login logic
router.post("/login",passport.authenticate("local",
{
    successRedirect: "/blogs",
    failureRedirect: "/login"
}),function(req,res){

});

// Logout Route
router.get("/logout", function(req, res) {
    try {
        req.logout(); // Attempt to log the user out
        req.flash("success", "Logged you out!");
        res.redirect("/blogs");
    } catch (error) {
        console.error("Logout error:", error);
        req.flash("error", "Error logging out."); // Flash an error message
        res.redirect("/blogs"); // Redirect to a different page or handle the error gracefully
    }
});


module.exports = router;