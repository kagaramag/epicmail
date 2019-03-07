process.env.NODE_ENV = "test";

// api version
import version from "./../helpers/version";

//Require the dev-dependencies
import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import server from "../server";

import Users from "./../controllers/users";

const should = chai.should();
chai.use(chaiHttp);

// Initial Test
describe("Get all users", () => {
      // get a welcome message
      describe("/GET Users", () => {
            it("it should GET all users", done => {
                  chai
                  .request(server)
                  .get(version + "users")
                  .set('Authorization','Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoyLCJ0eXBlIjoidXNlciIsImlhdCI6MTU1MTk5NTU5M30.US1gCEYGvt9fyD6Aw44SNhIPCDyyrdGTJLitagjJQqM')
                  .send(Users)
                  .end((err, res) => {
                  should.not.exist(err);
                  res.should.have.status(200);
                  res.body.should.be.a("object");
                  expect(res.body.data).to.be.a("array");
                  expect(res.body).to.have.haveOwnProperty("data");
                  expect(res.body.data[0].id).to.be.a("number");
                  expect(res.body.data[0].email).to.be.a("string");
                  expect(res.body.data[0].firstName).to.be.a("string");
                  expect(res.body.data[0].lastName).to.be.a("string");
                  expect(res.body.data[0].type).to.be.a("string");
                  expect(res.body.data[0].password).to.be.a("string");
                  expect(res.body.data[0].createdOn).to.be.a("string");
                  expect(res.body.data[0].username).to.be.a("string");
                  done();
                  });
            });
      });
});

module.exports = server;
