import { predefinedGames } from './predefinedGames';
import { api } from '../../lib/api';
import type { Content } from '../../types/content';

export async function loadPredefinedGames(): Promise<Content[]> {
  try {
    // Convert predefined games to Content type
    const games = predefinedGames.map((game, index) => ({
      id: `game-${index + 1}`,
      ...game,
      status: 'published' as const,
      version: 1,
      createdBy: 'admin',
      createdAt: new Date(),
      updatedAt: new Date()
    })) as Content[];

    // In development, just return the games
    if (import.meta.env.DEV) {
      return games;
    }

    // In production, check for existing games and create new ones
    const { data: existingContent } = await api.get('/api/content', {
      params: { type: 'game' }
    });

    const newGames = games.filter(game => 
      !existingContent.data.some((content: Content) => 
        content.title === game.title
      )
    );

    // Create new games
    for (const game of newGames) {
      await api.post('/api/content', game);
    }

    return games;
  } catch (error) {
    console.error('Failed to load predefined games:', error);
    return [];
  }
}