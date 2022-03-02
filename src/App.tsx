import { Tab, Tabs } from "@blueprintjs/core";
import * as React from "react";
import { ConfirmationModal, Container } from "./components";
import { useBotProfile } from "./contexts/BotProfile";
import { useCareerModeLoadingStatus } from "./contexts/GameModeProvider";
import { BotProfile } from "./pages/BotProfile";
import { CareerMode } from "./pages/CareerMode";

const App: React.FC = () => {
  const [selectedTab, setSelectedTab] = React.useState('botProfile');
  const { mounted: loadedBotProfile } = useBotProfile();
  const loadedCareerMode = useCareerModeLoadingStatus();

  return (
    <>
      <div className="bp3-dark">
        <div className="scrollable-container">
          <Container>
            <Tabs large id="TabsExample" onChange={setSelectedTab as any} selectedTabId={selectedTab} animate>
              <Tab id="botProfile" disabled={!loadedBotProfile} title="Bot profile" panel={<BotProfile />} />
              <Tab id="careerMode" disabled={!loadedCareerMode} title="Tour of Duty" panel={<CareerMode />} />
            </Tabs>
          </Container>
        </div>
      </div>
      <ConfirmationModal />
    </>
  );
};

export default App;
