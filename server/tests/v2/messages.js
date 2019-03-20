import chai from "chai";
import chaiHttp from "chai-http";
import server from "../../server";
import ST from "../../config/status";

chai.use(chaiHttp);

const { expect } = chai;

let authToken;

describe("User able to create an account ", () => {
  before((done) => {
    chai
      .request(server)
      .post("/api/v2/auth/signup")
      .send({
        firstname: "test",
        lastname: "tester",
        email: "tester@gmail.com",
        password: "test57",
      })
      .end((err, res) => {        
        done(err);
      });
  });
  it("Should login a user", (done) => {
    chai
      .request(server)
      .post("/api/v2/auth/login")
      .send({
        email: "tester@gmail.com",
        password: "test57",
      })
      .end((err, res) => {
        authToken = res.body.data[0];
        expect(res).to.have.status(ST.OK);
        expect(res.body.status).to.be.equal(ST.OK);
        done(err);
      });
  });
  it("Should get a list of users", (done) => {
    chai
      .request(server)
      .get("/api/v2/users")
      .set('Authorization',`Bearer ${authToken}`)
      .end((err, res) => {
        expect(res).to.have.status(ST.OK);
        expect(res.body.status).to.be.equal(ST.OK);
        done(err);
      });
  });
  it("Should profile information", (done) => {
    chai
      .request(server)
      .get("/api/v2/profile")
      .set('Authorization',`Bearer ${authToken}`)
      .end((err, res) => {
        expect(res).to.have.status(ST.OK);
        expect(res.body.status).to.be.equal(ST.OK);
        done(err);
      });
  });
  it("Should profile information", (done) => {
    chai
      .request(server)
      .get("/api/v2/profile")
      .set('Authorization',`Bearer ${authToken}`)
      .end((err, res) => {
        expect(res).to.have.status(ST.OK);
        expect(res.body.status).to.be.equal(ST.OK);
        done(err);
      });
  });

  it("Should Compose a message if details are correct", (done) => {
    chai
      .request(server)
      .post("/api/v2/messages")
      .set('Authorization',`Bearer ${authToken}`)
      .send({
        parentmessageid:0,
        subject: "subject one",
        message: "message one",
        receiverid:1,
      })
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body.status).to.be.equal(201);
        done(err);
      });
  });

  it('Should return error if token is not provided', (done) => {
    chai
      .request(server)
      .post('/api/v2/messages')
      .set('Authorization', '')
      .send({
        parentmessageid:0,
        subject: "subject one",
        message: "message one",
        receiverid:1,
      })
      .end((err, res) => {
        expect(res).to.have.status(ST.NOT_FOUNT);
        expect(res.body.status).to.be.equal(ST.NOT_FOUNT);
        expect(res.body.error).to.be.equal('Token is not provided');
        done(err);
      });
  });

  it('Should return error if subject is empty', (done) => {
    chai
      .request(server)
      .post('/api/v2/messages')
      .set('Authorization',`Bearer ${authToken}`)
      .send({
        parentmessageid:0,
        subject: "",
        message: "message one",
        receiverid:1,
      })
      .end((err, res) => {
        expect(res).to.have.status(ST.BAD_REQUEST);
        expect(res.body.status).to.be.equal(ST.BAD_REQUEST);
        expect(res.body).to.have.haveOwnProperty("error");
        done(err);
      });
  });

  it('Should return error if message is empty', (done) => {
    chai
      .request(server)
      .post('/api/v2/messages')
      .set('Authorization',`Bearer ${authToken}`)
      .send({
        parentmessageid:0,
        subject: "Subject one",
        message: "",
        receiverid:1,
      })
      .end((err, res) => {
        expect(res).to.have.status(ST.BAD_REQUEST);
        expect(res.body.status).to.be.equal(ST.BAD_REQUEST);
        expect(res.body).to.have.haveOwnProperty("error");
        done(err);
      });
  });

  it('Should return error if receiverId is empty', (done) => {
    chai
      .request(server)
      .post('/api/v2/messages')
      .set('Authorization',`Bearer ${authToken}`)
      .send({
        parentmessageid:0,
        subject: "",
        message: "message one",
        receiverid:"",
      })
      .end((err, res) => {
        expect(res).to.have.status(ST.BAD_REQUEST);
        expect(res.body.status).to.be.equal(ST.BAD_REQUEST);
        expect(res.body).to.have.haveOwnProperty("error");
        done(err);
      });
  });
});

// // User can Get message tests
describe('User can get all received messages', () => {
  before((done) => {
    chai
      .request(server)
      .post('/api/v2/messages')
      .set('Authorization',`Bearer ${authToken}`)
      .send({
        parentmessageid:0,
        subject: "tristique fusce congue diam",
        message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
        receiverid:1,
      })
      .end((err) => {
        done(err);
      });
  });
  it('Should return all received messages', (done) => {
    chai
      .request(server)
      .get('/api/v2/messages')
      .set('Authorization',`Bearer ${authToken}`)
      .end((err, res) => {
        expect(res).to.have.status(ST.OK);
        expect(res.body.status).to.be.equal(ST.OK);
        done(err);
      });
  });
});

// User can Get unread message tests
// describe('User can get all unread messages', () => {
//   before((done) => {
//     chai
//       .request(server)
//       .post('/api/v2/messages/unread')
//       .set('Authorization',`Bearer ${authToken}`)
//       .send({
//         subject: 'Hope',
//         message: 'Kigali is lit',
//         receiverId: '1',
//         parentMessageId: '1',
//       })
//       .end((err) => {
//         done(err);
//       });
//   });
//   it('Should return all unread messages', (done) => {
//     chai
//       .request(server)
//       .get('/api/v2/messages/unread')
//       .set('Authorization',`Bearer ${authToken}`)
//       .end((err, res) => {
//         expect(res).to.have.status(200);
//         expect(res.body.status).to.be.equal(200);
//         done(err);
//       });
//   });
// });

// // User can Get Sent message tests
describe('User can get Sent messages', () => {
  before((done) => {
    chai
      .request(server)
      .post('/api/v2/messages')
      .set('Authorization',`Bearer ${authToken}`)
      .send({
        parentmessageid:0,
        subject: "tristique fusce congue diam",
        message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
        receiverid:1,
      })
      .end((err) => {
        done(err);
      });
  });
  it('Should return all Sent messages', (done) => {
    chai
      .request(server)
      .get('/api/v2/messages/sent')
      .set('Authorization',`Bearer ${authToken}`)
      .end((err, res) => {
        expect(res).to.have.status(ST.OK);
        expect(res.body.status).to.be.equal(ST.OK);
        expect(res.body.data[0].status).to.be.equal('sent');
        done(err);
      });
  });
});


describe('User can get Specific message', () => {
  before((done) => {
    chai
      .request(server)
      .post('/api/v2/messages/1')
      .set('Authorization',`Bearer ${authToken}`)
      .send({
        parentmessageid:0,
        subject: "tristique fusce congue diam",
        message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
        receiverid:1,
      })
      .end((err) => {
        done(err);
      });
  });
  it('Should return a specific message', (done) => {
    chai
      .request(server)
      .get('/api/v2/messages/1')
      .set('Authorization',`Bearer ${authToken}`)
      .end((err, res) => {
        expect(res).to.have.status(ST.OK);
        expect(res.body.status).to.be.equal(ST.OK);
        expect(res.body.data[0].subject).to.be.a("string");
        expect(res.body.data[0].message).to.be.a("string");
        expect(res.body.data[0].status).to.be.equal('sent');
        done(err);
      });
  });
});


// describe('User can delete Specific message', () => {
//   before((done) => {
//     chai
//       .request(server)
//       .post('/api/v2/messages/1')
//       .set('Authorization',`Bearer ${authToken}`)
//       .send({
//         subject: 'Hope',
//         message: 'Kigali is lit',
//         receiverId: '1',
//         parentMessageId: '1',
//       })
//       .end((err) => {
//         done(err);
//       });
//   });
//   it('Should delete a specific message', (done) => {
//     chai
//       .request(server)
//       .delete('/api/v2/messages/1')
//       .set('Authorization',`Bearer ${authToken}`)
//       .end((err, res) => {
//         expect(res).to.have.status(200);
//         expect(res.body.status).to.be.equal(200);
//         done(err);
//       });
//   });
// });


// Groups


describe("Admin can create a group ", () => {
  before((done) => {
    chai
      .request(server)
      .post("/api/v2/groups")
      .set('Authorization',`Bearer ${authToken}`)
      .send({
        name: "Gamers"
      })
      .end((err, res) => {  
        expect(res).to.have.status(ST.CREATED);  
        expect(res.body.status).to.be.equal(ST.CREATED);    
        done(err);
      });
  });
  it("Should get a list of groups", (done) => {
    chai
      .request(server)
      .get("/api/v2/groups")
      .set('Authorization',`Bearer ${authToken}`)
      .end((err, res) => {
        expect(res).to.have.status(ST.OK);
        expect(res.body.status).to.be.equal(ST.OK);
        expect(res.body.data[0].name).to.be.a("string");
        done(err);
      });
  });
  it("Should a user to a group", (done) => {
    chai
      .request(server)
      .patch("/api/v2/groups/1/name")
      .send({
        name: "New Group Name"
      })
      .set('Authorization',`Bearer ${authToken}`)
      .end((err, res) => {
        expect(res).to.have.status(ST.OK);
        expect(res.body.status).to.be.equal(ST.OK);
        done(err);
      });
  });  
});