const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://prince-admin:kLFg9tE1gtyQ4Rm4@cluster0.mya6a.mongodb.net/PayTM");

const userSchema = mongoose.Schema({
    username: String,
    password: String,
    firstName: String,
    lastName: String,
});
const accountSchema = mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
        required: true
    },
    balance:{
        type: Number,
        required: true
    }
})

const User = mongoose.model("User",userSchema);
const Account = mongoose.model("Account",accountSchema);

module.exports = {
    User,Account
}