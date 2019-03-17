process.env.NODE_ENV = "test";

//Require the dev-dependencies
import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import server from "../../server";

import contacts from "../../controllers/v2/contact";

const should = chai.should();
chai.use(chaiHttp);

// Initial Test
describe("Get all contacts", () => {
      before(function() {
            this.skip();
      });
      // get a welcome message
      describe("/GET Contacts", () => {
            it("it should GET all contacts", done => {
                  chai
                  .request(server)
                  .get("/api/v2/contacts")
                  .set('Authorization','Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoyLCJ0eXBlIjoidXNlciIsImlhdCI6MTU1MTk5NTU5M30.US1gCEYGvt9fyD6Aw44SNhIPCDyyrdGTJLitagjJQqM')
                  .send(contacts)
                  .end((err, res) => {
                  should.not.exist(err);
                  res.should.have.status(201);
                  res.body.should.be.a("object");
                  expect(res.body.data).to.be.a("array");
                  expect(res.body).to.have.haveOwnProperty("data");
                  expect(res.body.data[0].id).to.be.a("number");
                  expect(res.body.data[0].email).to.be.a("string");
                  expect(res.body.data[0].firstName).to.be.a("string");
                  expect(res.body.data[0].lastName).to.be.a("string");
                  expect(res.body.data[0].createdOn).to.be.a("string");
                  done();
                  });
            });
      });
});

module.exports = server;