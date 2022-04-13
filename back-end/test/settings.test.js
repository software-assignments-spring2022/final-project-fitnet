const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app');
const should = chai.should();

describe('/POST save-changes', () => { 
    it('it should UPDATE the current user information in settings with requested changes', (done) => { 
        const uid = Math.floor(Math.random() * 100) 
        const user = { 
            uid: uid, 
            name: "John Doe", 
            username: "j.doe5", 
            bio: "Hey there. My name's John and I'm a third year NYU student studying computer science. I love going to the gym in my free time.", 
            email: "johndoe5@gmail.com", 
            password: "doedoe987" 
        }
        chai.request(server) 
        .post('/save-changes') 
        .send(user)
        .end((err, res) => { 
            res.should.have.status(200); 
            res.body.should.be.a("object") 
            res.body.should.have.property("user")
            res.body.should.have.property("status") 
            res.body.user.should.be.a("object") 
            res.body.status.should.be.a("string") 
            res.body.user.should.have.property("name") 
            res.body.user.should.have.property("username") 
            res.body.user.should.have.property("bio") 
            res.body.user.should.have.property("email")
            res.body.user.should.have.property("password")
            res.body.user.name.should.eql(user.name) 
            res.body.user.username.should.eql(user.username) 
            res.body.user.bio.should.eql(user.bio)
            res.body.user.email.should.eql(user.email)
            res.body.user.password.should.eql(user.password)
            done() 
        })
    })
})