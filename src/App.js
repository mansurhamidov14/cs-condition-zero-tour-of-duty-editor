import { Tab, Tabs } from "@blueprintjs/core";
import React from "react";
import { Container } from "./components";
import { BotProfileProvider } from "./contexts/BotProfile";
import { DefaultConfig } from "./partials/DefaultConfig";
import { Players } from "./partials/Players";
import { Templates } from "./partials/Templates";

const App = () => {
  const [selectedTab, setSelectedTab] = React.useState('baseConfig');

  return (
    <BotProfileProvider>
      <div className="bp3-dark">
        <Container className="py-1">
          <Tabs id="TabsExample" onChange={setSelectedTab} selectedTabId={selectedTab} animate>
            <Tab id="baseConfig" title="Base configuration" panel={<DefaultConfig />} />
            <Tab id="templates" title="Templates" panel={<Templates />} />
            <Tab id="players" title="Players" panel={<Players />} />
          </Tabs>
        </Container>
      </div>
    </BotProfileProvider>
  )
}

export default App;
