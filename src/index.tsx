import * as React from "react";
import * as ReactDOM from "react-dom";
import App from "./App";
import { BotProfileProvider } from "./contexts/BotProfile";
import { CareerModeProvider } from "./contexts/GameModeProvider";
import reportWebVitals from "./reportWebVitals";

import "@blueprintjs/icons/lib/css/blueprint-icons.css";
import "@blueprintjs/core/lib/css/blueprint.css";
import "./index.css";
import { TabsProvider } from "./contexts/Tabs";

ReactDOM.render(
  <React.StrictMode>
    <TabsProvider>
      <BotProfileProvider>
        <CareerModeProvider>
          <App />
        </CareerModeProvider>
      </BotProfileProvider>
    </TabsProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(console.log);
