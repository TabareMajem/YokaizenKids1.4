import type { Content } from '../../types/content';

export const predefinedGames: Partial<Content>[] = [
  {
    title: "Harmony Quest: A Journey Through the Seasons",
    description: "Experience emotional growth through Japanese seasonal festivals and traditions, learning emotional regulation, empathy, and social harmony.",
    type: "game",
    category: "emotional-awareness",
    content: "Interactive seasonal game teaching emotional intelligence through Japanese cultural experiences.",
    metadata: {
      ageRange: [7, 12],
      duration: 20,
      difficulty: "intermediate",
      skills: [
        "emotional-regulation",
        "empathy",
        "conflict-resolution",
        "self-reflection",
        "cultural-awareness"
      ],
      gameConfig: {
        type: "harmony-quest",
        config: {
          seasons: [
            {
              name: "spring",
              festival: "hanami",
              challenges: [
                {
                  type: "social",
                  points: {
                    high: 10,
                    medium: 5,
                    low: 0
                  }
                }
              ]
            },
            {
              name: "summer",
              festival: "tanabata",
              challenges: [
                {
                  type: "conflict-resolution",
                  points: {
                    high: 10,
                    medium: 5,
                    low: 0
                  }
                }
              ]
            },
            {
              name: "autumn",
              festival: "harvest",
              challenges: [
                {
                  type: "teamwork",
                  points: {
                    high: 10,
                    medium: 5,
                    low: 0
                  }
                }
              ]
            },
            {
              name: "winter",
              festival: "new-year",
              challenges: [
                {
                  type: "reflection",
                  points: {
                    high: 10,
                    medium: 5,
                    low: 0
                  }
                }
              ]
            }
          ],
          progressionSystem: {
            minScoreToAdvance: 70,
            bonusThreshold: 90
          },
          visualThemes: {
            spring: {
              primary: "cherry-blossoms",
              secondary: "picnic-scenes"
            },
            summer: {
              primary: "star-festival",
              secondary: "bamboo-decorations"
            },
            autumn: {
              primary: "harvest-fields",
              secondary: "lantern-festivals"
            },
            winter: {
              primary: "snow-landscapes",
              secondary: "new-year-celebrations"
            }
          }
        }
      }
    }
  },
  // Previous games remain unchanged
  {
    title: "Emotion Explorer",
    description: "An interactive story game where students explore different emotional scenarios and learn appropriate responses.",
    type: "game",
    category: "emotional-awareness",
    content: "Interactive story-based game teaching emotional intelligence through scenarios and choices.",
    metadata: {
      ageRange: [5, 12],
      duration: 15,
      difficulty: "beginner",
      skills: ["emotional-awareness", "decision-making", "empathy"],
      gameConfig: {
        type: "interactive-story",
        config: {
          initialScene: "playground",
          characters: ["Sarah", "Teacher", "Friends"],
          emotions: ["happy", "sad", "angry", "surprised"]
        }
      }
    }
  },
  {
    title: "Emotion Balloon Pop",
    description: "Pop balloons matching the target emotion while building quick emotional recognition skills.",
    type: "game",
    category: "emotional-awareness",
    content: "Fast-paced game focusing on quick emotional recognition and response.",
    metadata: {
      ageRange: [6, 12],
      duration: 10,
      difficulty: "beginner",
      skills: ["emotional-recognition", "quick-thinking", "focus"],
      gameConfig: {
        type: "balloon-pop",
        config: {
          emotions: ["happy", "sad", "angry", "surprised", "scared"],
          gameDuration: 60,
          spawnRate: 2
        }
      }
    }
  },
  {
    title: "Calm Clouds",
    description: "Release worries into floating clouds while practicing mindfulness and emotional release.",
    type: "game",
    category: "mindfulness",
    content: "Relaxation-focused game teaching mindfulness and worry management.",
    metadata: {
      ageRange: [7, 12],
      duration: 10,
      difficulty: "beginner",
      skills: ["mindfulness", "emotional-regulation", "stress-management"],
      gameConfig: {
        type: "calm-clouds",
        config: {
          cloudTypes: ["worry", "thought", "feeling"],
          backgroundScenes: ["sunset", "dawn", "night"]
        }
      }
    }
  },
  {
    title: "AR Emotion Masks",
    description: "Use AR technology to practice and recognize facial expressions associated with different emotions.",
    type: "game",
    category: "emotional-awareness",
    content: "AR-powered game for practicing emotional expressions and recognition.",
    metadata: {
      ageRange: [5, 12],
      duration: 15,
      difficulty: "intermediate",
      skills: ["facial-expression", "emotional-recognition", "self-awareness"],
      gameConfig: {
        type: "ar-masks",
        config: {
          emotions: ["happy", "sad", "angry", "surprised", "scared"],
          useCamera: true,
          features: ["face-tracking", "expression-detection"]
        }
      }
    }
  },
  {
    title: "Kindness Advent Calendar",
    description: "Daily kindness challenges that build empathy and social awareness.",
    type: "game",
    category: "social-skills",
    content: "Calendar-based game promoting daily acts of kindness and empathy.",
    metadata: {
      ageRange: [5, 12],
      duration: 5,
      difficulty: "beginner",
      skills: ["empathy", "kindness", "social-awareness"],
      gameConfig: {
        type: "kindness-calendar",
        config: {
          duration: 25,
          challengeTypes: ["family", "friends", "community"],
          theme: "winter"
        }
      }
    }
  },
  {
    title: "Kotowaza Quest",
    description: "Learn emotional wisdom through Japanese proverbs in an interactive village setting.",
    type: "game",
    category: "emotional-awareness",
    content: "Story-driven game teaching emotional wisdom through traditional Japanese proverbs.",
    metadata: {
      ageRange: [8, 12],
      duration: 20,
      difficulty: "intermediate",
      skills: ["cultural-awareness", "emotional-wisdom", "problem-solving"],
      gameConfig: {
        type: "kotowaza-quest",
        config: {
          locations: ["shrine", "market", "garden"],
          characters: ["monk", "merchant", "gardener"]
        }
      }
    }
  },
  {
    title: "Calligraphy of Calm",
    description: "Practice mindfulness through Japanese calligraphy and breathing exercises.",
    type: "game",
    category: "mindfulness",
    content: "Meditative game combining calligraphy practice with breathing exercises.",
    metadata: {
      ageRange: [7, 12],
      duration: 15,
      difficulty: "intermediate",
      skills: ["mindfulness", "focus", "artistic-expression"],
      gameConfig: {
        type: "calligraphy",
        config: {
          characters: ["心", "和", "愛"],
          brushTypes: ["soft", "medium", "hard"]
        }
      }
    }
  },
  {
    title: "Mochi Teamwork Challenge",
    description: "Learn collaboration through the traditional Japanese mochi-making process.",
    type: "game",
    category: "social-skills",
    content: "Rhythm-based cooperative game teaching teamwork through traditional mochi making.",
    metadata: {
      ageRange: [6, 12],
      duration: 10,
      difficulty: "beginner",
      skills: ["teamwork", "rhythm", "coordination"],
      gameConfig: {
        type: "mochi-teamwork",
        config: {
          roles: ["pounder", "turner"],
          difficulty: "normal",
          gameDuration: 60
        }
      }
    }
  },
  {
    title: "Zen Garden Builder",
    description: "Design a peaceful zen garden while reflecting on emotions and finding inner calm.",
    type: "game",
    category: "mindfulness",
    content: "Creative game focusing on emotional expression through garden design.",
    metadata: {
      ageRange: [7, 12],
      duration: 20,
      difficulty: "beginner",
      skills: ["creativity", "mindfulness", "emotional-expression"],
      gameConfig: {
        type: "zen-garden",
        config: {
          elements: ["rocks", "sand", "plants", "lanterns"],
          tools: ["rake", "shovel", "brush"]
        }
      }
    }
  },
  {
    title: "Harmony Choir",
    description: "Build collaboration and listening skills through virtual choir coordination.",
    type: "game",
    category: "social-skills",
    content: "Musical game teaching collaboration through choir coordination.",
    metadata: {
      ageRange: [8, 12],
      duration: 15,
      difficulty: "intermediate",
      skills: ["teamwork", "listening", "musical-awareness"],
      gameConfig: {
        type: "harmony-choir",
        config: {
          voices: ["soprano", "alto", "tenor", "bass"],
          songs: ["simple", "medium", "complex"]
        }
      }
    }
  }
];