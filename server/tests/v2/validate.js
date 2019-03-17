process.env.NODE_ENV = "test";

// Validator
import Validate from "../../helpers/v2/validation";

//Require the dev-dependencies
import chai, { expect } from "chai";
import chaiHttp from "chai-http";

const should = chai.should();
chai.use(chaiHttp);

// Initial Test
describe("Test validator helper", () => {
  before(function() {
        this.skip();
  });
  const user = {
    firstName: "Donielle",
    lastName: "Koeppke",
    password: "S7EiPah7",
    username: "iwacu",
    email: "iwacu@epicmail.com",
    tile: "Imagine if chicken can dance hip hop",
    phone: 788202020
  };
  // Username
  describe("/Username", () => {
    it("it should be 3 to 25 characters", () => {
      Validate.username(user.username).should.be.a("object");
    });
  });
  // Name
  describe("/Name", () => {
    it("it should be 3 to 25 characters", () => {
      Validate.name(user.name).should.be.a("object");
    });
  });
  // Name
  describe("/phone", () => {
    it("Must be numeric", () => {
      Validate.phone(user.phone).should.be.a("object");
    });
  });
  // email
  describe("/email", () => {
    it("Email should contain @epicmail.com", () => {
      Validate.email(user.email).should.be.a("object");
    });
  });
  // title
  describe("/title", () => {
    it("it should be alphanumeric", () => {
      Validate.title(user.title).should.be.a("object");
    });
  });
  describe("/loginEmail", () => {
    it("it should be a valid email and registered under '@epicmail.com'", () => {
      Validate.loginEmail(user.loginEmail).should.be.a("object");
    });
  });
});
