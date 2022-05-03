/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app');

const should = chai.should();
// const allUsers = require('../mock_users.json')

// chai.use(chaiHttp);

describe('/GET/user/:username', () => {
  it('it should GET a user by the given username', (done) => {
    // const user = allUsers[uid]
    const username = 'mochaTest';
    chai
      .request(server)
      .get(`/${username}`)
      .end((err, res) => {
        // console.log('Printing res.body');
        // console.log(res.body);
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('user');
        res.body.should.have.property('status');
        res.body.user.should.be.a('object');
        res.body.status.should.be.a('string');
        res.body.user.should.have.property('username');
        res.body.user.should.have.property('name');
        res.body.user.should.have.property('bio');
        res.body.user.should.have.property('email');
        res.body.user.should.have.property('password');
        res.body.user.should.have.property('profile_pic');
        res.body.user.username.should.eql(username);
        res.body.user.name.should.eql('Mocha Test');
        // res.body.user.bio.should.eql(user.bio)
        res.body.user.email.should.eql('mochaTest@gmail.com');
        res.body.user.password.should.eql('coffee');
        // res.body.user.profile_pic.should.eql(user.profile_pic)
        done();
      });
  });
});
