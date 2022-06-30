const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
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

describe('user routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('new user created upon sign up', async () => {
    const res = await request(app).post('/api/v1/users').send(mockUser);
    const { email } = mockUser;

    expect(res.body).toEqual({
      id: expect.any(String),
      email,
    });
  });

  it('logs in a created user', async () => {
    const res = await request(app).post('/api/v1/users').send(mockUser);
    const { email } = mockUser;

    expect(res.body).toEqual({
      id: expect.any(String),
      email,
    });
    const res1 = await request(app)
      .post('/api/v1/users/sessions')
      .send(mockUser);

    expect(res1.status).toEqual(200);
    expect(res1.body.message).toEqual('Successfully signed in');
  });

  afterAll(() => {
    pool.end();
  });
});
