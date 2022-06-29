const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
// const { agent } = require('supertest');

describe('backend-express-template routes', () => {
  beforeEach(() => {
    return setup(pool);
  });
  it('GET /cats gets a list of all cats', async() => {
    const resp = await request(app).get('/cats');
    expect(resp.status).toEqual(200);
    // expect(resp.body).toEqual(the entire cats array i dont want to write it)
  });
  afterAll(() => {
    pool.end();
  });
});
