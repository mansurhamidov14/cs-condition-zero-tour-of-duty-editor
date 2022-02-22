import React from "react";
import { mockBotProfile } from "./mocks";

export const BotProfileContext = React.createContext(null);

export const BotProfileProvider = ({ children }) => {
  const [botProfile, setBotProfile] = React.useState(mockBotProfile);
  const backup = React.useRef(JSON.parse(JSON.stringify(mockBotProfile)))

  return (
    <BotProfileContext.Provider value={{ botProfile, setBotProfile, backup: backup.current }}>
      {children}
    </BotProfileContext.Provider>
  );
};
