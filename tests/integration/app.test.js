const superTest =require('supertest');
const app = require('../../app');
const { MONGO_URI } = process.env;
var mongoose = require('mongoose');
var mongoDb= MONGO_URI;
mongoose.connect(mongoDb);

let server;

// Test Whole module
describe("App Module Integration Testing", ()=>{

    test('Has a module',(done)=>{
     expect(app).toBeDefined();
     done();
    });
    beforeAll(()=>{
      server = app.listen(2000);
    });

    afterAll((done)=>{
       server.close(done);
    });

    describe("Check index page",  ()=>{
        it('Should return json object with status 200',async ()=>{
           await superTest(server)
            .get('/')
            .expect(200);
        });
    });

    // Movies CRUD -endpoints
    describe("Movies CRUD endpoints", ()=>{
        
        // A dummy record
        let testRecord = {
            "name": "Test name", 
            "description": "Details of the Test name", 
            "releaseDate": (new Date().toString()), 
            "genre": "New Generation", 
            "duration": "100 minutes", 
            "rating": "4.5"
        };

        let recordId = null;
        
        // Test list all movies
        it('Should list all movies', async () => {
            const expectedResponse = []
            await superTest(app)
            .get('/movies')
            .set('Accept', 'application/json')
            .expect(200);
        });
        
        // Test movie creation
        it("Should create new movie",  async ()=>{
            await superTest(server).post('/movies')
            .send(testRecord)
            .set('Accept', 'application/json')
            .expect(201)
            .expect(function(res) {
              let obj = JSON.parse(res.text);
              recordId = obj._id;
            });
        });


        // Get record by ID
        it('Should get movie record by id', async () => {
            const expectedResponse = {...testRecord, "_id": recordId ,  "__v": 0}
            await superTest(app)
            .get(`/movies/${recordId}`)
            .set('Accept', 'application/json')
            .expect(200)
            .expect(function(res) {
                expect(res.body).toEqual(expectedResponse)
            });
        });
        
        // Test update of the movie record
        it('Should update a movie record', async () => {
            testRecord.name = "Test Two";
            const expectedResponse = {...testRecord, "_id": recordId ,  "__v": 0}
            await superTest(app)
            .patch(`/movies/${recordId}`)
            .set('Accept', 'application/json')
            .send(testRecord)
            .expect(200)
            .expect(function(res){
                expect(res.body).toEqual(expectedResponse);
            });
        });
        
        // Test delete movie record
        it('Should delete a movie record', async () => {
            const expectedResponse = {
                "msg": "Record has been successfully deleted!",
                "code": 200
            };
            await superTest(app)
            .delete(`/movies/${recordId}`)
            .set('Accept', 'application/json')
            .expect(200)
            .expect(function(res){
                expect(res.body).toEqual(expectedResponse);
            });
        });

    });

    describe("Genre CRUD endpoints", ()=>{

        let testRecord = {
            "name": "Genre Test name", 
            "description": "Genre Details of the Test name", 
        };

        let recordId = null;
        
        // Test list of genres
        it('Should list all genres', async () => {
            const expectedResponse = []
            await superTest(app)
            .get('/genres')
            .set('Accept', 'application/json')
            .expect(200);
        });

        // Test creation of a genre
        it("Should create new genre",  async ()=>{
            await superTest(server).post('/genres')
            .send(testRecord)
            .set('Accept', 'application/json')
            .expect(201)
            .expect(function(res) {
              let obj = JSON.parse(res.text);
              recordId = obj._id;
            });
        });

        // Test show of genre show by id

        it('Should get genre record by id', async () => {
            const expectedResponse = {...testRecord, "_id": recordId ,  "__v": 0}
            await superTest(app)
            .get(`/genres/${recordId}`)
            .set('Accept', 'application/json')
            .expect(200)
            .expect(function(res) {
                expect(res.body).toEqual(expectedResponse)
            });
        });


        // Test update genre
        it('Should update a genre record', async () => {
            testRecord.name = "Test Two";
            const expectedResponse = {...testRecord, "_id": recordId ,  "__v": 0}
            await superTest(app)
            .patch(`/genres/${recordId}`)
            .set('Accept', 'application/json')
            .send(testRecord)
            .expect(200)
            .expect(function(res){
                expect(res.body).toEqual(expectedResponse);
            });
        });


        // Test delete genre
        it('Should delete a genre record', async () => {
            const expectedResponse = {
                "msg": "Record has been successfully deleted!",
                "code": 200
            };
            await superTest(app)
            .delete(`/genres/${recordId}`)
            .set('Accept', 'application/json')
            .expect(200)
            .expect(function(res){
                expect(res.body).toEqual(expectedResponse);
            });
        });

    });


    // Test Not Found page
    describe('404 Page',()=>{
      it('Should return 404 not-found page', async ()=>{
         await superTest(server)
         .get('/custom-ur-link')
         .expect(404);
      })
    });
});

