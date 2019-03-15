process.env.NODE_ENV = 'test';

//Require the dev-dependencies
import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../../server';

const should = chai.should();
chai.use(chaiHttp);

// Initial Test
describe('Testing Erros', () => {
      it('it should GET an error message', (done) => {
            chai.request(server)
            .get("/api/v2/foo")
            .end((err, res) => {
                  should.not.exist(err);
                  res.body.should.be.a('object');
            done();
            });
      });
});

module.exports = server;