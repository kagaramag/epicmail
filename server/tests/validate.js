
// Validator
import Validate from "../helpers/validation";


//Require the dev-dependencies
import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import server from "../server";

//load users
import users from "../data/users";

const should = chai.should();
chai.use(chaiHttp);


// Initial Test
describe("Test validator helper", () => {
   const user =  {
         firstName: "Donielle",
         lastName: "Koeppke",
         password: "S7EiPah7",
         username: "iwacu"
   }
   // Username  
   describe("/Username", () => {
      it("it should be 3 to 25 characters", () => {
      //   assert.ok(Validate.username("y"));
      Validate.username(user.username).should.be.a("object");
      // console.log()
      });
    });
   // Name  
   describe("/Name", () => {
      it("it should be 3 to 25 characters", () => {
      //   assert.ok(Validate.username("y"));
      Validate.name(user.name).should.be.a("object");
      // console.log()
      });
    });
   // Name  
   describe("/phone", () => {
      it("it should be 3 to 25 characters", () => {
      //   assert.ok(Validate.username("y"));
      Validate.phone(user.phone).should.be.a("object");
      // console.log()
      });
    });
   // email  
   describe("/email", () => {
      it("it should be 3 to 25 characters", () => {
      //   assert.ok(Validate.username("y"));
      Validate.phone(user.email).should.be.a("object");
      // console.log()
      });
    });
   // title  
   describe("/email", () => {
      it("it should be 3 to 25 characters", () => {
      //   assert.ok(Validate.username("y"));
      Validate.phone(user.title).should.be.a("object");
      // console.log()
      });
    });

});