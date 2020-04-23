const { expect } = require('chai');
const supertest = require('supertest');
const server = require('../src/server');

describe('GET endpoint', () => {
  it('GET / responds with 200 containing moodjournalentries contents', () => {
    return supertest(server)
      .get('/api/moodjournal/entries')
      .expect(200);
  });
});
