const isAutheticated = (req, res, next) =>{ 
   const bearerHeader = req.headers["authorization"];
   if (typeof bearerHeader !== 'undefined') {
     const bearer = bearerHeader.split(" ");
     const bearerToken = bearer[1];
     req.token = bearerToken;
     next();
   } else {
     res.status(403).send({
         status:400,
         error:"Whoochs, Access denied. Try to login first!"
     });
   }
}

export default isAutheticated