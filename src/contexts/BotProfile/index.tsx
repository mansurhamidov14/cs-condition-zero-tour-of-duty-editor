import * as React from "react";
import { IBotProfile } from "../../models/types";
import { BotCampaignProfile } from "../../models/BotCampaignProfile";

const { ipcRenderer } = window.require('electron');

export const BotProfileContext = React.createContext(new BotCampaignProfile(''));

export class BotProfileProvider extends React.Component<{}, IBotProfile> {
  state = { mounted: false } as any;

  componentDidMount () {
    ipcRenderer.on('BotProfile:loaded', (_: any, fileContent: string) => {
      const botCampaignProfile = new BotCampaignProfile(fileContent);
      botCampaignProfile.onMount((state) => this.setState(state));
    });
  }

  render () {
    return (
      <BotProfileContext.Provider value={this.state}>
        {this.props.children}
      </BotProfileContext.Provider>
    );
  }
}

export function useBotProfile () {
  return React.useContext(BotProfileContext);
}
