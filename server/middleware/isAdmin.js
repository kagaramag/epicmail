
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import ST from "./../config/status";
dotenv.config();

const isAdmin = (req, res, next) =>{ 
  if(req.token){
    // get the decoded payload and header
    console.log(req.token);
    var decoded = jwt.decode(req.token, {complete: true});
    console.log(decoded.payload);
    if (decoded.payload.admin) {
      next();
    } else {
      res
      .status(ST.UNAUTHORIZED)
      .send({
          status:ST.UNAUTHORIZED,
          error:"Sorry, you are not admin"
      });
    }
  }else{
    res
    .status(ST.BAD_REQUEST)
    .send({
        status:ST.BAD_REQUEST,
        error:"No token provided!"
    });

  }
}

export default isAdmin