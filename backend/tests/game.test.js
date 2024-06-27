const request = require('supertest');
const app = require('../server');
const Game = require('../models/Game');

describe('Games API', () => {
  let gameId;

  it('should create a new game', async () => {
    const response = await request(app)
      .post('/api/games')
      .send({ title: 'Test Game', genre: 'RPG', releaseDate: '2024-06-24' });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('_id');
    gameId = response.body._id;
  });

  it('should get all games', async () => {
    const response = await request(app).get('/api/games');
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });

  it('should update an existing game', async () => {
    const response = await request(app)
      .put(`/api/games/${gameId}`)
      .send({ title: 'Updated Test Game', genre: 'Adventure' });

    expect(response.status).toBe(200);
    expect(response.body.title).toBe('Updated Test Game');
  });

  it('should delete an existing game', async () => {
    const response = await request(app).delete(`/api/games/${gameId}`);
    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Game deleted');
  });
});
