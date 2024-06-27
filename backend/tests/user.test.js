const request = require('supertest');
const app = require('../server');
const User = require('../models/User');

describe('User API', () => {
  it('should register a new user', async () => {
    const response = await request(app)
      .post('/api/users/register')
      .send({ username: 'testuser', password: 'password' });

    expect(response.status).toBe(201);
  });

  it('should authenticate an existing user', async () => {
    const response = await request(app)
      .post('/api/auth/login')
      .send({ username: 'testuser', password: 'password' });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('token');
  });
});
