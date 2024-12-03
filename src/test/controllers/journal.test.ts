import request from 'supertest';
import { app } from '../../server';
import { User } from '../../server/models/User';
import { Journal } from '../../server/models/Journal';
import { generateToken } from '../../server/utils/auth';

describe('Journal Controller', () => {
  let token: string;
  let userId: string;

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
  });

  describe('POST /api/journals', () => {
    it('should create a new journal entry', async () => {
      const journalData = {
        text: 'Today was a great day!',
      };

      const response = await request(app)
        .post('/api/journals')
        .set('Authorization', `Bearer ${token}`)
        .send(journalData);

      expect(response.status).toBe(201);
      expect(response.body.success).toBe(true);
      expect(response.body.data).toHaveProperty('text', journalData.text);
      expect(response.body.data).toHaveProperty('userId', userId);
      expect(response.body.data).toHaveProperty('mood');
      expect(response.body.data).toHaveProperty('tags');
    });

    it('should return 401 without auth token', async () => {
      const response = await request(app)
        .post('/api/journals')
        .send({ text: 'Test entry' });

      expect(response.status).toBe(401);
    });

    it('should return 400 with invalid data', async () => {
      const response = await request(app)
        .post('/api/journals')
        .set('Authorization', `Bearer ${token}`)
        .send({});

      expect(response.status).toBe(400);
    });
  });

  describe('GET /api/journals', () => {
    beforeEach(async () => {
      // Create test journal entries
      await Journal.create([
        {
          userId,
          text: 'Journal 1',
          mood: { value: 0.8, dominantEmotion: 'happy', confidence: 0.9 },
          tags: ['happy'],
          createdAt: new Date()
        },
        {
          userId,
          text: 'Journal 2',
          mood: { value: 0.6, dominantEmotion: 'content', confidence: 0.85 },
          tags: ['content'],
          createdAt: new Date()
        }
      ]);
    });

    it('should return user\'s journal entries', async () => {
      const response = await request(app)
        .get('/api/journals')
        .set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data).toHaveLength(2);
      expect(response.body.pagination).toBeDefined();
    });

    it('should support pagination', async () => {
      const response = await request(app)
        .get('/api/journals?page=1&limit=1')
        .set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(200);
      expect(response.body.data).toHaveLength(1);
      expect(response.body.pagination.page).toBe(1);
      expect(response.body.pagination.limit).toBe(1);
    });
  });
});