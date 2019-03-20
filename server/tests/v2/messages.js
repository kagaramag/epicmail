import chai from "chai";
import chaiHttp from "chai-http";
import server from "../../server";

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
        authToken = res.body.token;
        done(err);
      });
  });

  it("Should Compose a message if details are correct", (done) => {
    chai
      .request(server)
      .post("/api/v2/messages")
      .set('Authorization',`Bearer ${authToken}`)
      .send({
        parentmessageid: "1",
        subject: "subject one",
        message: "message one",
        senderid: "2",
        receiverid: "1",
      })
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body.status).to.be.equal(201);
        done(err);
      });
  });

  it('Should return error if token is not provided', (done) => {
    chai
      .request(app)
      .post('/api/v2/messages')
      .set('Authorization', '')
      .send({
        subject: 'Hope',
        message: 'Kigali is lit',
        receiverId: '2',
        parentMessageId: '1',
      })
      .end((err, res) => {
        expect(res).to.have.status(401);
        expect(res.body.status).to.be.equal(401);
        expect(res.body.error).to.be.equal('Token is not provided');
        done(err);
      });
  });

  it('Should return error if subject is empty', (done) => {
    chai
      .request(app)
      .post('/api/v2/messages')
      .set('Authorization',`Bearer ${authToken}`)
      .send({
        subject: '',
        message: 'Kigali is lit',
        receiverId: '2',
        parentMessageId: '1',
      })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.status).to.be.equal(400);
        expect(res.body.error).to.be.equal('Provide a subject');
        done(err);
      });
  });

  it('Should return error if message is empty', (done) => {
    chai
      .request(app)
      .post('/api/v2/messages')
      .set('Authorization',`Bearer ${authToken}`)
      .send({
        subject: 'Hope',
        message: '',
        receiverId: '2',
        parentMessageId: '1',
      })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.status).to.be.equal(400);
        expect(res.body.error).to.be.equal('Enter a message');
        done(err);
      });
  });

  it('Should return error if receiverId is empty', (done) => {
    chai
      .request(app)
      .post('/api/v2/messages')
      .set('Authorization',`Bearer ${authToken}`)
      .send({
        subject: 'The weather',
        message: 'Kigali is lit',
        receiverId: '',
        parentMessageId: '1',
      })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.status).to.be.equal(400);
        expect(res.body.error).to.be.equal('Please enter a receiverId');
        done(err);
      });
  });
});

// User can Get message tests
describe('User can get all received messages', () => {
  before((done) => {
    chai
      .request(app)
      .post('/api/v2/messages')
      .set('Authorization',`Bearer ${authToken}`)
      .send({
        subject: 'Hope',
        message: 'Kigali is lit',
        receiverId: '2',
        parentMessageId: '1',
      })
      .end((err) => {
        done(err);
      });
  });
  it('Should return all received messages', (done) => {
    chai
      .request(app)
      .get('/api/v2/messages')
      .set('Authorization',`Bearer ${authToken}`)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.status).to.be.equal(200);
        done(err);
      });
  });
  it('Should return error if token is not provided', (done) => {
    chai
      .request(app)
      .get('/api/v2/messages')
      .set('Authorization', '')
      .end((err, res) => {
        expect(res).to.have.status(401);
        expect(res.body.status).to.be.equal(401);
        expect(res.body.error).to.be.equal('Token is not provided');
        done(err);
      });
  });
});

// User can Get unread message tests
describe('User can get all unread messages', () => {
  before((done) => {
    chai
      .request(app)
      .post('/api/v2/messages/unread')
      .set('Authorization',`Bearer ${authToken}`)
      .send({
        subject: 'Hope',
        message: 'Kigali is lit',
        receiverId: '1',
        parentMessageId: '1',
      })
      .end((err) => {
        done(err);
      });
  });
  it('Should return all unread messages', (done) => {
    chai
      .request(app)
      .get('/api/v2/messages/unread')
      .set('Authorization',`Bearer ${authToken}`)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.status).to.be.equal(200);
        done(err);
      });
  });
});

// User can Get Sent message tests
describe('User can get Sent messages', () => {
  before((done) => {
    chai
      .request(app)
      .post('/api/v2/messages/sent')
      .set('Authorization',`Bearer ${authToken}`)
      .send({
        subject: 'Hope',
        message: 'Kigali is lit',
        receiverId: '1',
        parentMessageId: '1',
      })
      .end((err) => {
        done(err);
      });
  });
  it('Should return all Sent messages', (done) => {
    chai
      .request(app)
      .get('/api/v2/messages/sent')
      .set('Authorization',`Bearer ${authToken}`)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.status).to.be.equal(200);
        expect(res.body.data[0].status).to.be.equal('Sent');
        done(err);
      });
  });
});


describe('User can get Specific message', () => {
  before((done) => {
    chai
      .request(app)
      .post('/api/v2/messages/1')
      .set('Authorization',`Bearer ${authToken}`)
      .send({
        subject: 'Hope',
        message: 'Kigali is lit',
        receiverId: '1',
        parentMessageId: '1',
      })
      .end((err) => {
        done(err);
      });
  });
  it('Should return a specific message', (done) => {
    chai
      .request(app)
      .get('/api/v2/messages/1')
      .set('Authorization',`Bearer ${authToken}`)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.status).to.be.equal(200);
        expect(res.body.data[0].status).to.be.equal('Read');
        expect(res.body.data[0].subject).to.be.equal('Hope');
        expect(res.body.data[0].message).to.be.equal('Kigali is lit');
        done(err);
      });
  });
});


describe('User can delete Specific message', () => {
  before((done) => {
    chai
      .request(app)
      .post('/api/v2/messages/1')
      .set('Authorization',`Bearer ${authToken}`)
      .send({
        subject: 'Hope',
        message: 'Kigali is lit',
        receiverId: '1',
        parentMessageId: '1',
      })
      .end((err) => {
        done(err);
      });
  });
  it('Should delete a specific message', (done) => {
    chai
      .request(app)
      .delete('/api/v2/messages/1')
      .set('Authorization',`Bearer ${authToken}`)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.status).to.be.equal(200);
        done(err);
      });
  });
});
