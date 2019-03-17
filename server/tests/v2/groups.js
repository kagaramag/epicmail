process.env.NODE_ENV = "test";

//Require the dev-dependencies
import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import server from "../../server";

const should = chai.should();
chai.use(chaiHttp);

// Initial Test
describe("Groups", () => {
  before(function() {
        this.skip();
  });
  // send email emails
  it("it should get all groups", done => {
    chai
      .request(server)
      .get("/api/v2/groups")
      .end((err, res) => {
        should.not.exist(err);
        res.should.have.status(201);
        res.body.should.be.a("object");
        expect(res.body.data).to.be.a("array");
        expect(res.body).to.have.haveOwnProperty("data");
        expect(res.body.data[0].id).to.be.a("number");
        expect(res.body.data[0].name).to.be.a("string");
        expect(res.body.data[0].createdOn).to.be.a("string");
        done();
      });
  }); 
});

module.exports = server;
