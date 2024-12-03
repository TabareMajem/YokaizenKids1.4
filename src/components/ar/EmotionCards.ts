import { type EmotionCard } from './types';

export const emotionCards: EmotionCard[] = [
  {
    id: 'happy',
    emotion: 'Happy',
    description: 'A joyful feeling that makes you want to smile and share your happiness!',
    animalType: 'dog',
    activities: [
      'Happy Dance',
      'Share Joy',
      'Gratitude Journal'
    ],
    animations: {
      idle: 'dog_idle',
      happy: 'dog_tail_wag',
      sad: 'dog_sit'
    }
  },
  {
    id: 'sad',
    emotion: 'Sad',
    description: 'It\'s okay to feel down sometimes. Let\'s work through it together.',
    animalType: 'cat',
    activities: [
      'Gentle Breathing',
      'Comfort Corner',
      'Draw Feelings'
    ],
    animations: {
      idle: 'cat_idle',
      happy: 'cat_purr',
      sad: 'cat_curl'
    }
  },
  {
    id: 'excited',
    emotion: 'Excited',
    description: 'So much energy and enthusiasm! Let\'s channel it positively!',
    animalType: 'rabbit',
    activities: [
      'Energy Dance',
      'Creative Project',
      'Share Stories'
    ],
    animations: {
      idle: 'rabbit_idle',
      happy: 'rabbit_hop',
      sad: 'rabbit_rest'
    }
  },
  {
    id: 'calm',
    emotion: 'Calm',
    description: 'A peaceful state of mind, like a gentle breeze.',
    animalType: 'deer',
    activities: [
      'Deep Breathing',
      'Nature Sounds',
      'Quiet Corner'
    ],
    animations: {
      idle: 'deer_idle',
      happy: 'deer_graze',
      sad: 'deer_rest'
    }
  }
];