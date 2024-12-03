import request from 'supertest';
import { app } from '../../server';
import { User } from '../../server/models/User';
import { Journal } from '../../server/models/Journal';
import { Manga } from '../../server/models/Manga';
import { generateToken } from '../../server/utils/auth';

describe('Manga Controller', () => {
  let token: string;
  let userId: string;
  let journalId: string;

  beforeEach(async () => {
    // Create test user
    const user = await User.create({
      name: 'Test User',
      email: 'test@example.com',
      password: 'password123',
      role: 'student'
    });
    userId = user._id.toString();
    token = generateToken(userId);

    // Create test journal
    const journal = await Journal.create({
      userId,
      text: 'Test journal entry',
      mood: { value: 0.8, dominantEmotion: 'happy', confidence: 0.9 },
      tags: ['happy']
    });
    journalId = journal._id.toString();
  });

  describe('POST /api/manga', () => {
    it('should create a new manga from journal', async () => {
      const mangaData = {
        journalId,
        text: 'Test journal entry'
      };

      const response = await request(app)
        .post('/api/manga')
        .set('Authorization', `Bearer ${token}`)
        .send(mangaData);

      expect(response.status).toBe(201);
      expect(response.body.success).toBe(true);
      expect(response.body.data).toHaveProperty('userId', userId);
      expect(response.body.data).toHaveProperty('journalId', journalId);
      expect(response.body.data).toHaveProperty('panels');
    });

    it('should return 401 without auth token', async () => {
      const response = await request(app)
        .post('/api/manga')
        .send({ journalId, text: 'Test entry' });

      expect(response.status).toBe(401);
    });
  });

  describe('GET /api/manga/:id', () => {
    let mangaId: string;

    beforeEach(async () => {
      // Create test manga
      const manga = await Manga.create({
        userId,
        journalId,
        title: 'Test Manga',
        theme: 'happiness',
        emotionalJourney: 'positive',
        panels: [{
          imageUrl: 'test.jpg',
          description: 'Test panel',
          emotion: 'happy',
          dialogues: ['Hello!']
        }]
      });
      mangaId = manga._id.toString();
    });

    it('should return manga by id', async () => {
      const response = await request(app)
        .get(`/api/manga/${mangaId}`)
        .set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data).toHaveProperty('_id', mangaId);
      expect(response.body.data).toHaveProperty('title', 'Test Manga');
    });

    it('should return 404 for non-existent manga', async () => {
      const response = await request(app)
        .get('/api/manga/nonexistentid')
        .set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(404);
    });
  });
});