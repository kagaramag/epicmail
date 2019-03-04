process.env.NODE_ENV = 'test';

//Require the dev-dependencies
import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../server';

const should = chai.should();
chai.use(chaiHttp);

// Initial Test
describe('Initial Test', () => {
   // get a welcome message
   describe('/GET Initial', () => {
      it('it should GET a welcome message', (done) => {
         chai.request(server)
            .get('/')
            .end((err, res) => {
               should.not.exist(err);
               res.should.have.status(200);
               res.body.should.be.a('object');;
               done();
            });
      });
   });
});

module.exports = server;