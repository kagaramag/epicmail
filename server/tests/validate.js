process.env.NODE_ENV = 'test';

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
      it("Must be numeric", () => {
      //   assert.ok(Validate.username("y"));
      Validate.phone(user.phone).should.be.a("object");
      // console.log()
      });
    });
   // email  
   describe("/email", () => {
      it("Email should contain @epicmail.com", () => {
      //   assert.ok(Validate.username("y"));
      Validate.email(user.email).should.be.a("object");
      // console.log()
      });
    });
   // title  
   describe("/title", () => {
      it("it should be alphanumeric", () => {
      //   assert.ok(Validate.username("y"));
      Validate.title(user.title).should.be.a("object");
      // console.log()
      });
    });
   describe("/loginEmail", () => {
      it("it should be a valid email and registered under '@epicmail.com'", () => {
      //   assert.ok(Validate.username("y"));
      Validate.loginEmail(user.loginEmail).should.be.a("object");
      // console.log()
      });
    });

});