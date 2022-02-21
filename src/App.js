import { Tab, Tabs } from "@blueprintjs/core";
import React from "react";
import { Container } from "./components";
import { DefaultConfig } from "./partials/DefaultConfig";
import { Players } from "./partials/Players";

const App = () => {
  const [selectedTab, setSelectedTab] = React.useState('baseConfig');

  return (
    <div className="bp3-dark">
      <Container className="py-1">
        <Tabs id="TabsExample" onChange={setSelectedTab} selectedTabId={selectedTab} animate>
          <Tab id="baseConfig" title="Base configuration" panel={<DefaultConfig />} />
          <Tab id="players" title="Players" panel={<Players />} />
        </Tabs>
      </Container>
    </div>
    
  )
}

export default App;
