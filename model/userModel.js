const mongoose = require("mongoose");

var validateEmail = function(email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};

const userSchema = mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: [true, "Name is required"],
    },
    email: {
        type: String,
        trim: true,
        unique: [true, 'Email address should be unique'],
        validate: [ validateEmail, 'Email address should be valid'],
        required: [true, "Email is required"]
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minLength: [6, "Password should be minimum length of 6"]
    },
    cpassword: {
        type: String,
        required: true,
        minLength: 6,
    },
    role: {
        type: String,
        default: "subscriber",
        enum: ["admin", "subscriber"]
    }
})

module.exports = mongoose.model("User", userSchema);


// userSchema.path('email').validate(function (email) {
//    var emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
//    return emailRegex.test(email.text); // Assuming email has a text attribute
// }, 'The e-mail field cannot be empty.')