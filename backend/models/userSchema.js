const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username:{
        type:String,
    },
    email:{
        type:String,
   
    },
    password:{
        type:String,
    },
});
userSchema.statics.login = function (email, password) {
    return this.findOne({ email: email })
      .then((user) => {
        if (password == user.password) {
          return user;
        } else {
          return "password did not match";
        }
      })
      
  };

module.exports = mongoose.model("User", userSchema);