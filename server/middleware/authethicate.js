
import jwt from "jsonwebtoken";
import  ST  from '../config/status'
const isAutheticated = (req, res, next) =>{ 
   const bearerHeader = req.headers["authorization"];
   if (typeof bearerHeader !== 'undefined') {
     const bearer = bearerHeader.split(" ");
     const bearerToken = bearer[1];
     if(!bearerToken || !bearerToken.length){
       console.log("-- hano --")
      res.status(ST.NOT_FOUNT).send({
        status:ST.NOT_FOUNT,
        error:"Token is not provided"
      });
     }else{
      req.token = bearerToken;
      req.userId = jwt.decode(req.token, {complete: true}).payload.user;
      next();
     }
   } else {
    console.log("-- na hariya --")
     res.status(ST.UNAUTHORIZED).send({
         status:ST.UNAUTHORIZED,
         error:"Whoochs, Try to login first!"
     });
   }
}


export default isAutheticated