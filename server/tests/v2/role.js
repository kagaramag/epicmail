process.env.NODE_ENV = 'test';

//Require the dev-dependencies
import chai, { expect } from "chai";
import chaiHttp from "chai-http";

//load users
import Role from '../../helpers/v2/role'

const should = chai.should();
chai.use(chaiHttp);


// Role
describe("Role", () => {
   const role = {
      admin : 'admin',
      user : 'user'
   }
   // Test is a user is admin  
   describe("Admin", () => {
      it("Role should return admin", (done) => {
      let userRole = Role.admin(role.admin);
      userRole.should.equal(true);
      done()
      });
    });   
   // Test is a user is admin  
   describe("User", () => {
      it("Role should return user", (done) => {
      let userRole = Role.user(role.user);
      userRole.should.equal(true);
      done()
      });
    });   
});