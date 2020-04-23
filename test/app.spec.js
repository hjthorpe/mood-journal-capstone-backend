const { expect } = require('chai');
const supertest = require('supertest');
const { app } = require('../src/server');


//GET ENDPOINT
describe('GET endpoint', () => {
  it('GET / responds with 200', () => {
    return supertest(app)
      .get('/api/moodjournal/entries')
      .expect(200);
  });
});

//POST ENDPOINT
describe('POST endpoint', () => {
  it('POST / responds with 201', () => {
    return supertest(app)
      .post('/api/moodjournal/entries/post')
      .expect(201);
  });
});

//PATCH ENDPOINT
describe('PATCH endpoint', () => {
  it('PATCH / responds with 201', () => {
    return supertest(app)
      .patch('/api/moodjournal/entries/17')
      .expect(201);
  });
});

//DELETE ENDPOINT
describe('DELETE endpoint', () => {
  it('DELETE / responds with 204', () => {
    return supertest(app)
      .delete('/api/moodjournal/entries/17')
      .expect(204);
  });
});
