import { Tab, Tabs } from '@blueprintjs/core';
import * as React from 'react';
import { DefaultConfig } from './DefaultConfig';
import { Players } from './Players';
import { Templates } from './Templates';

export const BotProfile: React.FC = () => {
  const [selectedTab, setSelectedTab] = React.useState('baseConfig');

  return (
    <Tabs id="TabsExample" onChange={setSelectedTab as any} selectedTabId={selectedTab} vertical animate>
      <Tab id="baseConfig" title="Base configuration" panel={<DefaultConfig />} />
      <Tab id="templates" title="Templates" panel={<Templates />} />
      <Tab id="players" title="Players" panel={<Players />} />
    </Tabs>
  )
}