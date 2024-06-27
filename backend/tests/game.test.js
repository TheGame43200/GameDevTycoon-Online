const request = require('supertest');
const app = require('../server');
const Game = require('../models/Game');
const mongoose = require('mongoose');

describe('Games API', () => {
  let gameId;
  let token;

  beforeAll(async () => {
    // Connect to the test database
    const url = `mongodb://127.0.0.1/gamedev_test_db`;
    await mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });

    // Create a user and get the token
    const response = await request(app)
      .post('/api/auth/register')
      .send({ username: 'testuser', email: 'test@example.com', password: 'password' });
    token = response.body.token;
  });

  afterAll(async () => {
    // Clean up the test database
    await mongoose.connection.db.dropDatabase();
    await mongoose.connection.close();
  });

  it('should create a new game', async () => {
    const response = await request(app)
      .post('/api/games')
      .set('Authorization', `Bearer ${token}`)
      .send({ title: 'Test Game', genre: 'RPG', releaseDate: '2024-06-24' });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('_id');
    gameId = response.body._id;
  });

  it('should get all games', async () => {
    const response = await request(app).get('/api/games').set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });

  it('should update an existing game', async () => {
    const response = await request(app)
      .put(`/api/games/${gameId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ title: 'Updated Test Game', genre: 'Adventure' });

    expect(response.status).toBe(200);
    expect(response.body.title).toBe('Updated Test Game');
  });

  it('should delete an existing game', async () => {
    const response = await request(app)
      .delete(`/api/games/${gameId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Game deleted');
  });
});
