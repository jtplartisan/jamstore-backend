const jwt = require('jsonwebtoken');
require('dotenv').config()
exports.authUser = (req,res,next)=>{
    const token = req.headers.authorization?.split(' ')[1] 
   if (!token) {
    return res.status(401).json({ message: 'Authorization token is missing' });
   }
   jwt.verify(token,process.env.JWT_SECRET,(err,decoded)=>{
    if(err){
        return res.status(401).json({ message: 'Invalid token' });
    }
    if (decoded.role === 'user') {
        req.user = decoded.userId
        next()
    }
    else{
        return res.status(403).json({ message: 'Access denied' });
    }
   })
}
exports.authVendor = (req,res,next)=>{
    const token = req.headers.authorization?.split(' ')[1] 
   if (!token) {
    return res.status(401).json({ message: 'Authorization token is missing' });
   }
   jwt.verify(token,process.env.JWT_SECRET,(err,decoded)=>{
    if(err){

        return res.status(401).json({ message: 'Invalid token' });
    }

    if (decoded.role === 'vendor') {
        req.user = decoded.userId
        next()
    }
    else{
        return res.status(403).json({ message: 'Access denied' });
    }
   })

}
