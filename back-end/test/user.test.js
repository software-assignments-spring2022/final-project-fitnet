const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app');
const should = chai.should();
const allUsers = require('../mock_users.json') 

chai.use(chaiHttp); 

describe('/GET/uid/:uid', () => { 
    it('it should GET a user by the given uid', (done) => { 
        const uid = Math.floor(Math.random() * 100) 
        const user = allUsers[uid] 
        chai.request(server) 
        .get('/uid/' + uid ) 
        .end((err, res) => { 
            res.should.have.status(200) 
            res.body.should.be.a("object") 
            res.body.should.have.property("user") 
            res.body.should.have.property("status")
            res.body.user.should.be.a("object")
            res.body.status.should.be.a("string")
            res.body.user.should.have.property("username") 
            res.body.user.should.have.property("name") 
            res.body.user.should.have.property("bio") 
            res.body.user.should.have.property("email")
            res.body.user.should.have.property("password")
            res.body.user.should.have.property("profile_pic")
            res.body.user.username.should.eql(user.username) 
            res.body.user.name.should.eql(user.name)
            res.body.user.bio.should.eql(user.bio)
            res.body.user.email.should.eql(user.email)
            res.body.user.password.should.eql(user.password)
            res.body.user.profile_pic.should.eql(user.profile_pic)
            done() 
        })
    })
})

describe('/GET/:username', () => { 
    it('it should GET a user by the given username', (done) => { 
        const uid = Math.floor(Math.random() * 100) 
        const user = allUsers[uid] 
        chai.request(server) 
        .get('/' + user.username) 
        .end((err, res) => { 
            res.should.have.status(200) 
            res.body.should.be.a("object") 
            res.body.should.have.property("user") 
            res.body.should.have.property("status")
            res.body.user.should.be.a("object")
            res.body.status.should.be.a("string")
            res.body.user.should.have.property("username") 
            res.body.user.should.have.property("name") 
            res.body.user.should.have.property("bio") 
            res.body.user.should.have.property("email")
            res.body.user.should.have.property("password")
            res.body.user.should.have.property("profile_pic")
            res.body.user.username.should.eql(user.username) 
            res.body.user.name.should.eql(user.name)
            res.body.user.bio.should.eql(user.bio)
            res.body.user.email.should.eql(user.email)
            res.body.user.password.should.eql(user.password)
            res.body.user.profile_pic.should.eql(user.profile_pic)
            done() 
        })
    })
})