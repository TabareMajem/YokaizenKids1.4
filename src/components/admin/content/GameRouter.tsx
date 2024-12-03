import React from 'react';
import EmotionExplorer from '../../games/EmotionExplorer';
import EmotionBalloonPop from '../../games/EmotionBalloonPop';
import CalmClouds from '../../games/CalmClouds';
import EmotionMasks from '../../games/EmotionMasks';
import KindnessCalendar from '../../games/KindnessCalendar';
import KotowazaQuest from '../../games/KotowazaQuest';
import CalligraphyOfCalm from '../../games/CalligraphyOfCalm';
import MochiTeamwork from '../../games/MochiTeamwork';
import ZenGarden from '../../games/ZenGarden';
import HarmonyChoir from '../../games/HarmonyChoir';

type Props = {
  gameType: string;
};

export default function GameRouter({ gameType }: Props) {
  switch (gameType) {
    case 'interactive-story':
      return <EmotionExplorer />;
    case 'balloon-pop':
      return <EmotionBalloonPop />;
    case 'calm-clouds':
      return <CalmClouds />;
    case 'ar-masks':
      return <EmotionMasks />;
    case 'kindness-calendar':
      return <KindnessCalendar />;
    case 'kotowaza-quest':
      return <KotowazaQuest />;
    case 'calligraphy':
      return <CalligraphyOfCalm />;
    case 'mochi-teamwork':
      return <MochiTeamwork />;
    case 'zen-garden':
      return <ZenGarden />;
    case 'harmony-choir':
      return <HarmonyChoir />;
    default:
      return <div>Game not found</div>;
  }
}