const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app');
const should = chai.should();
const allPosts = require('../mock_posts.json')

chai.use(chaiHttp); 

describe('/GET posts', () => { 
    it('it should GET all mock feed posts', (done) => { 
        chai
            .request(server) 
            .get('/posts') 
            .end((err, res) => {
                res.should.have.status(200); 
                res.body.should.be.a("object") 
                res.body.should.have.property("posts")
                res.body.should.have.property("status") 
                res.body.posts.should.be.a("array")
                res.body.posts.length.should.be.eql(allPosts.length)
                res.body.status.should.be.a("string") 
                done() 
            })
    })
})
