const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app');
const should = chai.should();
const allUsers = require('../mock_users.json') 

describe('/POST new-post', () => { 
    it('it should POST a new post with the given picture and description', (done) => { 
        const uid = Math.floor(Math.random() * 100) 
        const user = allUsers[uid] 
        const post = { 
            username: user.username, 
            description: "Hey there everyone! Just me working out and doing some reps on a lovely Sunday. Hope y'all are doing well.", 
            picture: "http://dummyimage.com/140x100.png/cc0000/ffffff"
        }
        chai.request(server) 
        .post('/new-post') 
        .send(post)
        .end((err, res) => { 
            res.should.have.status(200); 
            res.body.should.be.a("object") 
            res.body.should.have.property("newpost")
            res.body.should.have.property("status") 
            res.body.newpost.should.be.a("object") 
            res.body.status.should.be.a("string") 
            res.body.newpost.should.have.property("username") 
            res.body.newpost.should.have.property("description") 
            res.body.newpost.should.have.property("picture") 
            res.body.newpost.username.should.eql(post.username)
            res.body.newpost.picture.should.eql(post.picture)
            res.body.newpost.description.should.eql(post.description) 
            done() 
        })
    })
})