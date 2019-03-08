import jwt from "jsonwebtoken";

class Role {
   // check if auth use is admin
   static admin(request){      
      let decoded = jwt.decode(request);
      return decoded.type == "admin"?true:false;
   }
   static user(request){      
      let decoded = jwt.decode(request);
      return decoded.type == "user"?true:false;
   }
}

export default Role;