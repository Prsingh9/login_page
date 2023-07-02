const jwt= require('jsonwebtoken');
const User=require('../modules/User');

//middleware to check auth status , apply this middleware to routes that require authentication
const requireAuth=(req,res,next)=>{

 const token=req.cookies.jwt;   //grab token from cookie

 //check json web token exist & is verified
 if(token){
    jwt.verify(token,'prabhakar secret',(err, decodedToken)=>{
       if(err){
        console.log(err.message);
        res.redirect('/login');
       } else{
        console.log(decodedToken);
        next();
       }
    })
 }
 else{
    res.redirect('/login');
 }
}

// check current user
const checkUser = (req, res, next) => {
   const token = req.cookies.jwt;
   if (token) {
     jwt.verify(token, 'prabhakar secret', async (err, decodedToken) => {
       if (err) {
         res.locals.user = null;
         next();
       } else {
         let user = await User.findById(decodedToken.id);
         res.locals.user = user;
         next();
       }
     });
   } else {
     res.locals.user = null;
     next();
   }
 };
 

//export this function
module.exports={requireAuth,checkUser};