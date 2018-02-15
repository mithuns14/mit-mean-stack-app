const mongoose=require('mongoose');
const bcrypt=require('bcryptjs');
const config=require('../config/database');



const UserSchema=mongoose
.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
});

const User=module.exports=mongoose.model('User',UserSchema);

module.exports.getUserByUserName=function(username,callback){
    const usernameQuery={username:username};
    User.findOne(usernameQuery,callback);    
};

module.exports.getUserByEmail=function(email,callback){
    
    const emailQuery={email:email};    
    User.findOne(emailQuery,callback);
};

module.exports.addUser=function(newUser,callback){

    bcrypt.genSalt(10,(err,salt)=>{

        bcrypt.hash(newUser.password,salt,(err,hash)=>{
            newUser.password=hash;
            newUser.save(callback);
        });
    });

};

module.exports.comparePassword=function(candidatePassword,hash,callback){
bcrypt.compare(candidatePassword,hash,(err,isMatch)=>{
    if(err) throw err;
    callback(null,isMatch);
});
}