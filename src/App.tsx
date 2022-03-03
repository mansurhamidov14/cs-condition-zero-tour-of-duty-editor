import { Tab, Tabs } from "@blueprintjs/core";
import * as React from "react";
import { ConfirmationModal, Container } from "./components";
import TabTitle from "./components/TabTitle";
import { useBotProfile } from "./contexts/BotProfile";
import { useCareerMode } from "./contexts/GameModeProvider";
import { BotProfile } from "./pages/BotProfile";
import { CareerMode } from "./pages/CareerMode";

const App: React.FC = () => {
  const [selectedTab, setSelectedTab] = React.useState('botProfile');
  const { mounted: loadedBotProfile, saved: botProfileSaved } = useBotProfile();
  const careerMode = useCareerMode();

  return (
    <>
      <div className="bp3-dark">
        <div className="scrollable-container">
          <Container>
            <Tabs large onChange={setSelectedTab as any} selectedTabId={selectedTab} renderActiveTabPanelOnly animate>
              <Tab
                id="botProfile"
                disabled={!loadedBotProfile}
                title={<TabTitle saved={!loadedBotProfile || botProfileSaved} title="Bot profile" />}
                panel={<BotProfile />}
              />
              <Tab
                id="careerMode"
                disabled={!careerMode.mounted}
                title={<TabTitle title="Tour of Duty" saved={!careerMode.hasUnsavedFile?.()} />}
                panel={<CareerMode />}
              />
            </Tabs>
          </Container>
        </div>
      </div>
      <ConfirmationModal />
    </>
  );
};

export default App;
