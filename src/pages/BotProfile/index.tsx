import { Tab, Tabs } from "@blueprintjs/core";
import * as React from "react";
import { useBotProfile } from "../../contexts/BotProfile";
import { useFileSave, useFileSaveAs } from "../../hooks";
import { DefaultConfig } from "./DefaultConfig";
import { Players } from "./Players";
import { Templates } from "./Templates";

export const BotProfile: React.FC = () => {
  const [selectedTab, setSelectedTab] = React.useState('baseConfig');
  const botProfile = useBotProfile();
  useFileSave(() => botProfile.save(), [botProfile]);
  useFileSaveAs(() => botProfile.saveAs(), [botProfile]);

  return (
    <>
      {botProfile.mounted && (
        <Tabs onChange={setSelectedTab as any} selectedTabId={selectedTab} renderActiveTabPanelOnly vertical animate>
          <Tab id="baseConfig" title="Base configuration" panel={<DefaultConfig />} />
          <Tab id="templates" title="Templates" panel={<Templates />} />
          <Tab id="players" title="Players" panel={<Players />} />
        </Tabs>
      )}
    </>
  )
}