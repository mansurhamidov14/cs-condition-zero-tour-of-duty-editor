import { Tab, Tabs } from "@blueprintjs/core";
import * as React from "react";
import { ConfirmationModal, Container } from "./components";
import { BotProfileProvider } from "./contexts/BotProfile";
import { CareerModeProvider } from "./contexts/GameModeProvider";
import { BotProfile } from "./pages/BotProfile";
import { CareerMode } from "./pages/CareerMode";

const App: React.FC = () => {
  const [selectedTab, setSelectedTab] = React.useState('botProfile');

  return (
    <BotProfileProvider>
      <CareerModeProvider>
        <div className="bp3-dark">
          <Container className="py-1">
            <Tabs large id="TabsExample" onChange={setSelectedTab as any} selectedTabId={selectedTab} animate>
              <Tab id="botProfile" title="Bot profile" panel={<BotProfile />} />
              <Tab id="careerMode" title="Tour of Duty" panel={<CareerMode />} />
            </Tabs>
          </Container>
        </div>
        <ConfirmationModal />
      </CareerModeProvider>
    </BotProfileProvider>
  )
}

export default App;
