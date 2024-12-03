import request from 'supertest';
import { app } from '../../server';
import { User } from '../../server/models/User';
import { Journal } from '../../server/models/Journal';
import { generateToken } from '../../server/utils/auth';

describe('Analytics Controller', () => {
  let token: string;
  let userId: string;

  beforeEach(async () => {
    // Create test user
    const user = await User.create({
      name: 'Test User',
      email: 'test@example.com',
      password: 'password123',
      role: 'teacher'
    });
    userId = user._id.toString();
    token = generateToken(userId);

    // Create test journals
    await Journal.create([
      {
        userId: user._id,
        text: 'Test journal 1',
        mood: { value: 0.8, dominantEmotion: 'happy', confidence: 0.9 },
        tags: ['happy', 'grateful'],
        createdAt: new Date()
      },
      {
        userId: user._id,
        text: 'Test journal 2',
        mood: { value: 0.6, dominantEmotion: 'content', confidence: 0.85 },
        tags: ['content', 'peaceful'],
        createdAt: new Date()
      }
    ]);
  });

  describe('GET /api/analytics/user/:userId', () => {
    it('should return user analytics', async () => {
      const response = await request(app)
        .get(`/api/analytics/user/${userId}`)
        .set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data).toHaveProperty('metrics');
      expect(response.body.data.metrics).toHaveProperty('journalCount', 2);
    });

    it('should return 401 without auth token', async () => {
      const response = await request(app)
        .get(`/api/analytics/user/${userId}`);

      expect(response.status).toBe(401);
    });
  });

  describe('GET /api/analytics/class/:classId', () => {
    it('should return class analytics for teachers', async () => {
      const response = await request(app)
        .get('/api/analytics/class/test-class-id')
        .set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data).toHaveProperty('metrics');
    });

    it('should return 403 for non-teacher users', async () => {
      const studentUser = await User.create({
        name: 'Student',
        email: 'student@example.com',
        password: 'password123',
        role: 'student'
      });
      const studentToken = generateToken(studentUser._id.toString());

      const response = await request(app)
        .get('/api/analytics/class/test-class-id')
        .set('Authorization', `Bearer ${studentToken}`);

      expect(response.status).toBe(403);
    });
  });
});