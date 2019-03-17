process.env.NODE_ENV = "test";

//Require the dev-dependencies
import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import server from "../../server";

const should = chai.should();
chai.use(chaiHttp);

// Initial Test
describe("Emails", () => {
      before(function() {
            this.skip();
      });
   const email = {
      "subject": "tristique fusce congue diam",
      "message": "tristique fusce congue diam id ornare",
      "parentMessageId":5,
      "status":"draft",
      "senderId": 1,
      "receiverId": 2,
      "phone": 250780000001
   }
   // send email emails
   it("it should send an email", done => {
         chai
         .request(server)
         .post("/api/v2/messages")
         .send(email)
         .end((err, res) => {
         should.not.exist(err);
         res.should.have.status(200);
         res.body.should.be.a("object");
         expect(res.body.data).to.be.a("array");
         expect(res.body).to.have.haveOwnProperty("data");
         expect(res.body.data[0].subject).to.be.a("string");
         expect(res.body.data[0].message).to.be.a("string");
         expect(res.body.data[0].parentMessageId).to.be.a("number");
         expect(res.body.data[0].senderId).to.be.a("number");
         expect(res.body.data[0].receiverId).to.be.a("number");
         done();
         });
   });
   // get emails
   it("it should GET all received emails", done => {
         chai
         .request(server)
         .get("/api/v2/messages")
         .end((err, res) => {
         should.not.exist(err);
         res.should.have.status(200);
         res.body.should.be.a("object");
         expect(res.body.data).to.be.a("array");
         expect(res.body).to.have.haveOwnProperty("data");
         expect(res.body.data[0].subject).to.be.a("string");
         expect(res.body.data[0].message).to.be.a("string");
         expect(res.body.data[0].parentMessageId).to.be.a("number");
         expect(res.body.data[0].senderId).to.be.a("number");
         expect(res.body.data[0].receiverId).to.be.a("number");
         done();
         });
   });
   // get unread emails
   it("it should GET all unread emails", done => {
         chai
         .request(server)
         .get("/api/v2/messages/unread")
         .end((err, res) => {
         should.not.exist(err);
         res.should.have.status(200);
         res.body.should.be.a("object");
         expect(res.body.data).to.be.a("array");
         expect(res.body).to.have.haveOwnProperty("data");
         done();
         });
   });
   // get emails
   it("it should GET all read emails", done => {
         chai
         .request(server)
         .get("/api/v2/messages/read")
         .end((err, res) => {
         should.not.exist(err);
         res.should.have.status(200);
         res.body.should.be.a("object");
         expect(res.body.data).to.be.a("array");
         expect(res.body).to.have.haveOwnProperty("data");
         expect(res.body.data[0].subject).to.be.a("string");
         expect(res.body.data[0].message).to.be.a("string");
         expect(res.body.data[0].status).equal("read");
         expect(res.body.data[0].parentMessageId).to.be.a("number");
         expect(res.body.data[0].senderId).to.be.a("number");
         expect(res.body.data[0].receiverId).to.be.a("number");
         done();
         });
   });
   // get sent emails
   it("it should GET all sent emails", done => {
         chai
         .request(server)
         .get("/api/v2/messages/sent")
         .end((err, res) => {
         should.not.exist(err);
         res.should.have.status(200);
         res.body.should.be.a("object");
         expect(res.body.data).to.be.a("array");
         expect(res.body).to.have.haveOwnProperty("data");
         expect(res.body.data[0].subject).to.be.a("string");
         expect(res.body.data[0].message).to.be.a("string");
         expect(res.body.data[0].status).equal("sent");
         expect(res.body.data[0].parentMessageId).to.be.a("number");
         done();
         });
   });
});

module.exports = server;