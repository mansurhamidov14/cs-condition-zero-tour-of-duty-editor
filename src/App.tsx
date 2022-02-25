import { Tab, Tabs } from "@blueprintjs/core";
import * as React from "react";
import { ConfirmationModal, Container } from "./components";
import { BotProfileProvider } from "./contexts/BotProfile";
import { DefaultConfig } from "./partials/DefaultConfig";
import { Players } from "./partials/Players";
import { Templates } from "./partials/Templates";

const App: React.FC = () => {
  const [selectedTab, setSelectedTab] = React.useState('baseConfig');

  return (
    <BotProfileProvider>
      <div className="bp3-dark">
        <Container className="py-1">
          <Tabs id="TabsExample" onChange={setSelectedTab as any} selectedTabId={selectedTab} animate>
            <Tab id="baseConfig" title="Base configuration" panel={<DefaultConfig />} />
            <Tab id="templates" title="Templates" panel={<Templates />} />
            <Tab id="players" title="Players" panel={<Players />} />
          </Tabs>
        </Container>
      </div>
      <ConfirmationModal />
    </BotProfileProvider>
  )
}

export default App;
