import { Tab, Tabs } from '@blueprintjs/core';
import * as React from 'react';
import TabTitle from '../../components/TabTitle';
import { useCareerMode } from '../../contexts/GameModeProvider';
import { EDifficulty } from '../../models/types';
import { capitalizeFirstLetter } from '../../utils';
import { DifficultyMode } from './DifficultyMode';

import './styles.css';

export const CareerMode: React.FC = () => {
  const [selectedTab, setSelectedTab] = React.useState<EDifficulty>(EDifficulty.EASY);
  const careerMode = useCareerMode();

  return careerMode.mounted ? (
      <Tabs onChange={setSelectedTab as any} renderActiveTabPanelOnly selectedTabId={selectedTab} animate vertical>
        {Object.values(EDifficulty).map(difficulty => (
          <Tab
            disabled={!careerMode[difficulty].mounted}
            key={difficulty}
            id={difficulty}
            title={
              <TabTitle
                saved={careerMode[difficulty].saved}
                title={capitalizeFirstLetter(difficulty) + ' missions'}
              />
            }
            panel={<DifficultyMode difficulty={difficulty} />}
          />
        ))}
      </Tabs>
    ) : <div/>;
};
