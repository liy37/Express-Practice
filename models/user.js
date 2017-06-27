var mongoose              = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var userSchema = new mongoose.Schema({
    username: String,
    password: String,
    saves: {
        s1: {
            title: {type: String, default: "Empty"},
            link: {type: String, default: "/read"}
        },
        s2: {
            title: {type: String, default: "Empty"},
            link: {type: String, default: "/read"}
        },
        s3: {
            title: {type: String, default: "Empty"},
            link: {type: String, default: "/read"}
        },
        s4: {
            title: {type: String, default: "Empty"},
            link: {type: String, default: "/read"}
        },
        s5: {
            title: {type: String, default: "Empty"},
            link: {type: String, default: "/read"}
        }
    }
});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", userSchema);