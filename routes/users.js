const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const User = require('../models/user-model');

// Register
router.post('/register', (req, res, next) => {
  let newUser = new User({
    name: req.body.name,
    email: req.body.email,
    username: req.body.username,
    password: req.body.password
  });

  var status=false;

      User.getUserByUserName(newUser.username,(err,user)=>{
       if(user){           
           status=true;
           callBack();
       }
       else
       {
                User.getUserByEmail(newUser.email,(err,user)=>{
                    if(user)
                    {
                        status=true;
                        callBack();            
                    }
                    else
                    {
                        callBack();
                    }
                });
        }    
    });

    function callBack(){
        if(status==true){
            //console.log('Email or Username already exists');
            res.json({success:false,msg:'Email or Username already exists'});
        }else{
                User.addUser(newUser,(err,user)=>{
                    if(err){
                        res.json({success:false,msg:'Failed to Register'});
                    }else{            
                        res.json({success:true,msg:'User Registered'});
                    }
            });
        }
    }
});



// Authenticate
router.post('/authenticate', (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;

  User.getUserByUserName(username, (err, user) => {
    if(err) throw err;
    if(!user){
      return res.json({success: false, msg: 'User not found'});
    }

    User.comparePassword(password, user.password, (err, isMatch) => {
      if(err) throw err;
      if(isMatch){
        const token = jwt.sign({data: user}, config.secret, {
          expiresIn: 604800 // 1 week
        });

        res.json({
          success: true,
          token: `Bearer ${token}`,
          user: {
            id: user._id,
            name: user.name,
            username: user.username,
            email: user.email
          }
        });
      } else {
        return res.json({success: false, msg: 'Wrong password'});
      }
    });
  });
});



router.get('/profile', ensureToken, function(req, res) {
    jwt.verify(req.token, config.secret, function(err, data) {
      if (err) {
        res.sendStatus(403);
      } else {
        res.json({user:data.data});
      }
    });
  });
  
  function ensureToken(req, res, next) {
    const bearerHeader = req.headers["authorization"];
    if (typeof bearerHeader !== 'undefined') {
      const bearer = bearerHeader.split(" ");
      const bearerToken = bearer[1];
      req.token = bearerToken;
      next();
    } else {
      res.sendStatus(403);
    }
  }
module.exports = router;





















































// const express=require('express');
// const router=express.Router();
// const passport=require('passport');
// const jwt=require('jsonwebtoken');
// const config=require('../config/database')
// const User=require('../models/user-model');
// require('../config/passport')(passport);


// router.post('/register',(req,res)=>{
//     //res.send('REGISTER');
//     let newUser=new User({
//         name:req.body.name,
//         email:req.body.email,
//         username:req.body.username,
//         password:req.body.password
//     });

//     var status=false;

//     User.getUserByUserName(newUser.username,(err,user)=>{
//        if(user){           
//            status=true;
//            callBack();
//        }
//        else
//        {
//                 User.getUserByEmail(newUser.email,(err,user)=>{
//                     if(user)
//                     {
//                         status=true;
//                         callBack();            
//                     }
//                     else
//                     {
//                         callBack();
//                     }
//                 });
//         }    
//     });

    

//     function callBack(){
//         if(status==true){
//             //console.log('Email or Username already exists');
//             res.json({success:false,msg:'Email or Username already exists'});
//         }else{
//                 User.addUser(newUser,(err,user)=>{
//                     if(err){
//                         res.json({success:false,msg:'Failed to Register'});
//                     }else{            
//                         res.json({success:true,msg:'User Registered'});
//                     }
//             });
//         }
//     }

    

    

// });

// router.post('/authenticate',(req,res)=>{
//     const username=req.body.username;
//     const password=req.body.password;

//     User.getUserByUserName(username,(err,user)=>{
//         if(err) throw err
//         if(!user){
//             res.json({success:false,msg:'Failed to Authenticate'});
//         }
        
//         else{

//                 User.comparePassword(password,user.password,(err,isMatch)=>{
//                     if(err) throw err
//                     if(isMatch){
//                         const token=jwt.sign({data:user},config.secret,{
//                             expiresIn:604800
//                         });

//                         res.json({
//                             success:true,
//                             token:'JWT '+token,
//                             user:{
//                                 id:user._id,
//                                 name:user.name,
//                                 username:user.username,
//                                 email:user.email
//                             }
//                         });
//                     }else{

//                         res.json({success:false,msg:'Wrong Password'});
//                     }
//                 });

//             }

//     });
// });

// router.get('/profile',passport.authenticate('jwt' ,{session:false}),(req,res,next)=>{
//     //res.send('PROFILE');
//     res.json({user:req.user});

//     //console.log(req.body.user);
//    //res.send({user:"test"});
// });


// module.exports=router;