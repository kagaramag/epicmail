
import jwt from "jsonwebtoken";
import  ST  from '../config/status'
  const isAutheticated = (req, res, next) =>{ 
  const bearerHeader = req.headers["authorization"];

  if (typeof bearerHeader === "undefined" || !bearerHeader) {
    res.status(ST.UNAUTHORIZED).send({ status: ST.UNAUTHORIZED, error: "Unauthorized access. login or register" });
  } else {
    const bearer = bearerHeader.split(" ");
    const bearerToken = bearer[1];
    req.token = bearerToken;
    jwt.verify(req.token, process.env.SECRET, (error, decoded) => {      
      if (error) return  res.status(ST.BAD_REQUEST).send({ status: ST.BAD_REQUEST, error: "failed to decode the token or it has expired" });
      req.userId = decoded.user;
      next();
    });
   }
}


export default isAutheticated


