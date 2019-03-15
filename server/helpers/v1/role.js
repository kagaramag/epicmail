import jwt from "jsonwebtoken";

class Role {
   // check if auth use is admin
   static admin(admin){      
      // let decoded = jwt.decode(request);
      // return decoded.type == "admin"?true:false;
      return admin == "admin"?true:false;
   }
   static user(user){      
      // let decoded = jwt.decode(request);
      // return decoded.type == "user"?true:false;
      return user == "user"?true:false;
   }
}

export default Role;