const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app');
const should = chai.should();
const allWorkouts = require('../mock_workouts.json')

chai.use(chaiHttp); 

describe('/GET workouts', () => { 
    it('it should GET all workouts', (done) => { 
        chai
            .request(server) 
            .get('/workouts') 
            .end((err, res) => {
                res.should.have.status(200); 
                res.body.should.be.a("object") 
                res.body.should.have.property("workouts")
                res.body.should.have.property("status") 
                res.body.workouts.should.be.a("array")
                res.body.workouts.length.should.be.eql(allWorkouts.length)
                res.body.status.should.be.a("string") 
                done() 
            })
    })
})