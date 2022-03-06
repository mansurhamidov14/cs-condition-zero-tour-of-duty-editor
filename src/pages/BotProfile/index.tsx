import { Tab, Tabs } from "@blueprintjs/core";
import * as React from "react";
import { useBotProfile } from "../../contexts/BotProfile";
import { useTabs } from "../../contexts/Tabs";
import { useFileSave, useFileSaveAs } from "../../hooks";
import { DefaultConfig } from "./DefaultConfig";
import { Players } from "./Players";
import { Templates } from "./Templates";

export const BotProfile: React.FC = () => {
  const { tabs: { botProfile: { activeTab } }, setBotProfileTab } = useTabs();
  const botProfile = useBotProfile();
  useFileSave(() => botProfile.save(), [botProfile]);
  useFileSaveAs(() => botProfile.saveAs(), [botProfile]);

  return (
    <>
      {botProfile.mounted && (
        <Tabs id="bot-profile" onChange={setBotProfileTab} selectedTabId={activeTab} renderActiveTabPanelOnly vertical animate>
          <Tab id="baseConfig" title="Base configuration" panel={<DefaultConfig />} />
          <Tab id="templates" title="Templates" panel={<Templates />} />
          <Tab id="players" title="Players" panel={<Players />} />
        </Tabs>
      )}
    </>
  )
}