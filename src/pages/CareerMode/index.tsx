import { Tab, Tabs } from '@blueprintjs/core';
import * as React from 'react';
import { EDifficulty } from '../../models/types';
import { capitalizeFirstLetter } from '../../utils';
import { DifficultyMode } from './DifficultyMode';

import './styles.css';

export const CareerMode: React.FC = () => {
  const [selectedTab, setSelectedTab] = React.useState<EDifficulty>(EDifficulty.EASY);

  return (
    <Tabs id="TabsExample" onChange={setSelectedTab as any} selectedTabId={selectedTab} animate>
      {Object.values(EDifficulty).map(difficulty => (
        <Tab id={difficulty} title={capitalizeFirstLetter(difficulty)} panel={<DifficultyMode difficulty={difficulty} />} />
      ))}
    </Tabs>
  );
};
