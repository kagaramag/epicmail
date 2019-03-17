import  ST  from '../config/status'
const isAutheticated = (req, res, next) =>{ 
   const bearerHeader = req.headers["authorization"];
   if (typeof bearerHeader !== 'undefined') {
     const bearer = bearerHeader.split(" ");
     const bearerToken = bearer[1];
     req.token = bearerToken;
     next();
   } else {
     res.status(ST.UNAUTHORIZED).send({
         status:ST.UNAUTHORIZED,
         error:"Whoochs, Try to login first!"
     });
   }
}


export default isAutheticated