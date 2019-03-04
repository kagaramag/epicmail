process.env.NODE_ENV = 'test';

// api version
import version from './../helpers/version'

//Require the dev-dependencies
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import server from '../server';

import Users from './../controllers/users';

const should = chai.should();
chai.use(chaiHttp);

// Initial Test
describe('Get all users', () => {
   // get a welcome message
   describe('/GET Users', () => {
      it('it should GET all users', (done) => {
         chai.request(server)
            .get(version+'users')
            .send(Users)
            .end((err, res) => {
               should.not.exist(err);
               res.should.have.status(200);
               res.body.should.be.a('object');
               expect(res.body.data).to.be.a("array");
               expect(res.body).to.have.haveOwnProperty("data");
               done();
            });
      });
   });
});

module.exports = server;