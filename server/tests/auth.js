process.env.NODE_ENV = 'test';

//Require the dev-dependencies
import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import server from "../server";

//load users
import users from "../data/users";

const should = chai.should();
chai.use(chaiHttp);


// Initial Test
describe("Sign up a user", () => {
      const user =  {
            firstName: "Donielle",
            lastName: "Koeppke",
            password: "S7EiPah7",
            username: "iwacu"
      }
      before(async () => {
            try {
                  let existing_user = users.find(item => item.username === user.username);
                  await users.splice(existing_user.id-1, 1);
            } catch (error) {
                  console.log(error);
            }
      });      
      // get a welcome message
      describe("/POST Register new user", () => {
            it("it should register a user", done => {
                  chai
                  .request(server)
                  .post("/auth/signup")
                  .send(user)
                  .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.be.a("object");
                  expect(res.body.data).to.be.a("array");
                  expect(res.body).to.have.haveOwnProperty("data");
                  expect(res.body.status).to.be.equal(200);
                  expect(res.body.data[0].token).to.be.a("string");
                  done();
                  });
            });
      });
});
describe("Sign up a user with invalid username", () => {
      const user =  {
            firstName: "Donielle",
            lastName: "Koeppke",
            password: "S7EiPah7",
            username: "i"
      }       
           
      // get a welcome message
      describe("/POST Register new user", () => {
            it("it should register a user", done => {
                  chai
                  .request(server)
                  .post("/auth/signup")
                  .send(user)
                  .end((err, res) => {
                  res.should.have.status(400);
                  res.body.should.be.a("object");
                  expect(res.body.status).to.be.a("number");
                  expect(res.body).to.have.haveOwnProperty("error");
                  expect(res.body.status).to.be.equal(400);
                  expect(res.body.error).to.be.a("string");
                  done();
                  });
            });
      });
});

describe("Sign up a user with invalid name", () => {
      const user =  {
            firstName: "Donielle",
            lastName: "hj",
            password: "S7EiPah7",
            username: "chicken"
      }   
       
      // get a welcome message
      describe("/POST Register new user", () => {
            it("it should register a user", done => {
                  chai
                  .request(server)
                  .post("/auth/signup")
                  .send(user)
                  .end((err, res) => {
                  res.should.have.status(400);
                  res.body.should.be.a("object");
                  expect(res.body.status).to.be.a("number");
                  expect(res.body).to.have.haveOwnProperty("error");
                  expect(res.body.status).to.be.equal(400);
                  expect(res.body.error).to.be.a("string");
                  done();
                  });
            });
      });
});
// login
describe("Login a user", () => {
      const user =  {
            password: "123122",
            email: "djallas@epicmail.com"
      }
      // get a welcome message
      describe("/POST Login a user", () => {
            it("it should authethicate a user", done => {
                  chai
                  .request(server)
                  .post("/auth/login")
                  .send(user)
                  .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.be.a("object");
                  expect(res.body.data).to.be.a("array");
                  expect(res.body).to.have.haveOwnProperty("data");
                  expect(res.body.data[0].token).to.be.a("string");
                  console.log(res.body)
                  done();
                  });
            });
      });
});
// fake login
describe("Login a fake user", () => {
      const user =  {
            password: "123122",
            email: "fake_email"
      }
      // get a welcome message
      describe("/POST Login a fake user", () => {
            it("it should not authethicate a user with no email", done => {
                  chai
                  .request(server)
                  .post("/auth/login")
                  .send(user)
                  .end((err, res) => {
                  res.should.have.status(400);
                  res.body.should.be.a("object");
                  expect(res.body).to.have.haveOwnProperty("error").equal('Email must be valid and registered under "@epicmail.com"');
                  expect(res.body).to.have.haveOwnProperty("status").equal(400);
                  done();
                  });
            });
      });
});
// fake login
describe("Login with email of other company", () => {
      const user =  {
            password: "123122",
            email: "djallas@gmail.com"
      }
      // get a welcome message
      describe("/POST Login an email of other company", () => {
            it("it should authethicate a user with emails registered under @epicmail.com", done => {
                  chai
                  .request(server)
                  .post("/auth/login")
                  .send(user)
                  .end((err, res) => {
                  res.should.have.status(400);
                  res.body.should.be.a("object");
                  expect(res.body).to.have.haveOwnProperty("error").equal('Email must be valid and registered under "@epicmail.com"');
                  expect(res.body).to.have.haveOwnProperty("status").equal(400);
                  done();
                  });
            });
      });
});

module.exports = server;
