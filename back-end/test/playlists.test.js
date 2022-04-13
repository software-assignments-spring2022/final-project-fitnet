const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app');
const should = chai.should();

chai.use(chaiHttp); 

describe('/GET/:id playlist', () => { 
    it('it should GET a playlist by the given workout id', (done) => { 
        const workout = { 
            id : "7e22f20c-3273-4a76-9bad-8206ca6095c5",
        }
        chai.request(server) 
        .get('/p/' + workout.id) 
        .send(workout) 
        .end((err, res) => { 
            res.should.have.status(200) 
            res.body.should.be.a("object") 
            res.body.should.have.property("playlist") 
            res.body.should.have.property("status")
            res.body.playlist.should.be.a("string")
            res.body.status.should.be.a("string")
            res.body.playlist.should.eql("") 
            done() 
        })
    })
})

describe('/POST/:id playlist', () => { 
    it('it should UPDATE a playlist with the new url', (done) => { 
        const workout = { 
            id : "7e22f20c-3273-4a76-9bad-8206ca6095c5",
            playlist: "https://open.spotify.com/album/4hDok0OAJd57SGIT8xuWJH?si=CW1fQJ4tRYCx-bOvv2we-A"
        }
        chai.request(server) 
        .post('/p/' + workout.id) 
        .send({
            playlist: workout.playlist
        })
        .end((err, res) => { 
            res.should.have.status(200); 
            res.body.should.be.a("object") 
            res.body.should.have.property("playlist")
            res.body.should.have.property("status") 
            res.body.playlist.should.be.a("string") 
            res.body.status.should.be.a("string") 
            res.body.playlist.should.eql(workout.playlist)
            done() 
        })
    })
})