import { Tab, Tabs } from "@blueprintjs/core";
import React from "react";
import { Container } from "./components";
import { DefaultConfig } from "./partials/DefaultConfig";

const App = () => {
  const [selectedTab, setSelectedTab] = React.useState('baseConfig');

  return (
    <div className="bp3-dark">
      <Container className="py-1">
        <Tabs id="TabsExample" onChange={setSelectedTab} selectedTabId={selectedTab} animate>
          <Tab id="baseConfig" title="Base configuration" panel={<DefaultConfig />} />
          <Tab id="teammates" title="Teammates" panel={null} />
          <Tab id="opponents" title="Opponents" panel={null} />
        </Tabs>
      </Container>
    </div>
    
  )
}

export default App;
