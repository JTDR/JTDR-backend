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
    expect(resp.body).toEqual([
      { 'id':'1', 'name':'Soup', 'age':3, 'eyes':'blue', 'fur':'tan' },
      { 'id':'2', 'name':'Cricket', 'age':16, 'eyes':'black', 'fur':'brown' },
      { 'id':'3', 'name':'Bear', 'age':8, 'eyes':'brown', 'fur':'black' },
      { 'id':'4', 'name':'Pasta', 'age':1, 'eyes':'yellow', 'fur':'gold' },
      { 'id':'5', 'name':'Howard', 'age':9, 'eyes':'red', 'fur':'brown' },
      { 'id':'6', 'name':'Otter', 'age':0, 'eyes':'blue', 'fur':'white' }]);
  });
  afterAll(() => {
    pool.end();
  });
});
