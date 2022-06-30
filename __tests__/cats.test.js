const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Cat = require('../lib/models/Cat');
const UserService = require('../lib/services/UserService');

const mockUser = {
  email: 'RandomUser@mock.com',
  password: '54321',
};

const signUpAndLogin = async (userProps = {}) => {
  const password = userProps.password ?? mockUser.password;

  const agent = request.agent(app);

  const user = await UserService.create({ ...mockUser, ...userProps });

  const { email } = user;
  await agent.post('/api/v1/users/sessions').send({
    email,
    password,
  });
  return [agent, user];
};

describe('cats routes', () => {
  beforeEach(() => {
    return setup(pool);
  });
  it('GET /cats gets a list of all cats', async () => {
    const resp = await request(app).get('/api/v1/cats');
    expect(resp.status).toEqual(200);
    expect(resp.body).toEqual([
      { id: '3', name: 'Bear', age: 8, eyes: 'brown', fur: 'black' },
      { id: '2', name: 'Cricket', age: 16, eyes: 'black', fur: 'brown' },
      { id: '5', name: 'Howard', age: 9, eyes: 'red', fur: 'brown' },
      { id: '6', name: 'Otter', age: 0, eyes: 'blue', fur: 'white' },
      { id: '4', name: 'Pasta', age: 1, eyes: 'yellow', fur: 'gold' },
      { id: '1', name: 'Soup', age: 3, eyes: 'blue', fur: 'tan' },
    ]);
  });

  it('GET /cats/:id returns a cat by its ID', async () => {
    const res = await request(app).get('/api/v1/cats/1');
    const soup = {
      id: '1',
      name: 'Soup',
      age: 3,
      eyes: 'blue',
      fur: 'tan',
    };
    expect(res.body).toEqual(soup);
  });

  it('POST /cats should create a new cat', async () => {
    const cat = new Cat({
      name: 'Prince',
      age: 2,
      eyes: 'pink',
      fur: 'black',
    });
    const [agent] = await signUpAndLogin();
    const resp = await agent.post('/api/v1/cats').send(cat);
    expect(resp.body.name).toEqual(cat.name);
    expect(resp.body.age).toEqual(cat.age);
    expect(resp.body.eyes).toEqual(cat.eyes);
    expect(resp.body.fur).toEqual(cat.fur);
  });

  it('DELETE /cats/:id deletes a cat', async () => {
    const [agent] = await signUpAndLogin();
    const resp = await agent.delete('/api/v1/cats/6');
    expect(resp.status).toBe(200);

    const check = await Cat.getById(6);
    expect(check).toBeNull();
  });

  it('PUT /cats/:id updates a cat', async () => {
    const [agent] = await signUpAndLogin();
    const resp = await agent.put('/api/v1/cats/1').send({ age: 400 });
    expect(resp.status).toBe(200);
    const check = await Cat.getById(1);
    expect(check.age).toEqual(400);
  });

  afterAll(() => {
    pool.end();
  });
});
