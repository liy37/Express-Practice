//Set up the requirements for the app
var express       = require("express"),
    bodyParser    = require("body-parser"),
    mongoose      = require("mongoose"),
    app           = express();
    passport      = require("passport"),
    LocalStrategy = require("passport-local"),
    post          = require("./models/post"),
    user          = require("./models/user"),
    comment       = require("./models/comment");
    

//Set up the app
//Use any your mongodb database here.
mongoose.connect("DUMMY MONGODB URL");


app.set("view engine", "ejs");
app.set("views","./public/views");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

//Passport Config
app.use(require("express-session")({
    secret: "g44V3-W8g436A4D5829/F2f46E",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(user.authenticate()));
passport.serializeUser(user.serializeUser());
passport.deserializeUser(user.deserializeUser());

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    next();
});

//Landing Page GET
app.get("/", function(req, res){
    res.render("landing");
});

//Find a starter read page
app.get("/read", function(req, res){
    if(Object.keys(req.query).length === 0){
        req.query["parentid"]="start";
        req.query["choiceP"]="";
    };
    post.find({"parentid": req.query["parentid"], "choiceP": req.query["choiceP"]}).sort({ popularity: -1 }).populate("comments").exec(function(err, posts){
        if(err){
            console.log("/read err");
        } else{
            if(posts.length > 0){
                res.redirect("/read/"+posts[0]._id);
            } else{
                res.render("noread", {"parentid": req.query["parentid"], "choiceP": req.query["choiceP"]});
            };
        };
    });
});

app.post("/read", function(req, res){
    post.create(req.body.post, function(err, newlyPosted){
        if(err){
            console.log("error in POST /read");
        } else{
            res.redirect("/read/"+newlyPosted._id);
        };
    });
});

app.post("/read/:postid", isLoggedIn, function(req, res){
    post.findById(req.params.postid, function(err, posts){
        if(err){
            console.log("err");
        } else{
            console.log
            comment.create({text: req.body.comment, author: req.user.username}, function(err, comment){
                if(err){
                    console.log("err");
                } else{
                    posts.comments.push(comment);
                    posts.save();        
                    res.redirect("/read/"+req.params.postid);
                };
            });
        };
    });    
});

app.post("/read/:postid/upvote", isLoggedIn, function(req, res){
    post.findById(req.params.postid, function(err, todo){
        if(err){
            console.log("err");
        } else{
            todo.popularity+=1;
            todo.save(function(err, todo){
                if(err){
                    console.log("err");
                }
//                todo.liked.push(req.user);
//                todo.save();
                res.redirect("/read/" + req.params.postid);
            });
        };
    }); 
});


app.get("/read/new", isLoggedIn, function(req, res){
    res.render("newread", {"parentid": req.query["parentid"], "choiceP": req.query["choiceP"]});
});

app.get("/read/search", function(req, res){
    post.find({"parentid": req.query["parentid"], "choiceP": req.query["choiceP"]}).sort({ popularity: -1 }).exec(function(err, posts) {
        if(err){
            console.log("error in /read/search");
        } else{
            res.render("search", {posts:posts});
        };
    });
});

app.get("/read/:postid", function(req,res){
    post.findById(req.params.postid).populate("comments").exec(function(err, posts){
        if(err){
            res.redirect("/read")
        } else{
            if(posts){
                res.render("read", {posts: posts});
            }
        }
    });
});

app.get("/read/:postid/upvote", function(req, res){
    res.redirect("/read/" + req.params.postid);
});

//Login
app.get("/login", function(req, res){
    res.render("login");
});

app.post("/login", passport.authenticate("local", 
    {
        successRedirect : "back",
        failureRedirect: "back",
    }));
    

app.get("/logout", function(req, res){
    req.logout();
    res.redirect("back");
});

app.get("/register", function(req, res){
    res.render("register");
});

app.post("/register", function(req, res){
    var newUser = new user({username: req.body.username});
     user.register(newUser, req.body.password, function(err, user){
         if(err){
             console.log("err");
             return res.render("register");
         }
         passport.authenticate("local")(req, res, function(){
             res.redirect("/");
         });
     });
});

app.post("/user", function(req,res){
    post.findById(req.body.url.substring(6), function(err, posts){
        if(err){
            console.log("save post finding error")
        } else{
            user.findById(req.body.userdata._id, function(err, usr){
                usr.saves[req.body.numberdata].link = req.body.url;
                usr.saves[req.body.numberdata].title = posts.title;
                usr.save(function(err, todo){
                    if(err){
                        console.log("error in saving a route to user");
                    } else{
                        res.send("success!")
                    }
                })
            });
        }
    });
});

app.get("/user/:userid", function(req,res){
    post.find({author: req.params.userid}, function(err, posts){
        if(err){
            console.log("error on /read/:userid");
        } else{
            if(posts){
                res.render("user", {posts: posts});
            }
        }
    });
});

app.post("/ajax/user", function(req,res){
    res.json(req.user);
})

app.post("/ajax/login", passport.authenticate("local"), function(req, res){
    res.json(req.session.returnTo||"/");
});

app.post("/ajax/read", isLoggedIn, function(req, res){
    post.create(req.body.post, function(err, newlyPosted){
        if(err){
            console.log("error in POST /ajax/read");
        } else{
            res.json({returnurl: newlyPosted._id});
        };
    });
});

//404 page
app.get("*", function(req, res){
    res.send("404 Error. This page has not been set up yet.");
});

//listen
app.listen(3000, function(){
   console.log("The Adventure App has started");
});
