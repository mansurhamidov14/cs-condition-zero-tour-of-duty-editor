import * as React from "react";
import { FileFromExplorer, IBotProfile } from "../../models/types";
import { BotCampaignProfile } from "../../models/BotCampaignProfile";
import { botProfileExample } from "./mocks";
import { IS_DEV } from "../../consts";

const { ipcRenderer } = window.require('electron');

export const BotProfileContext = React.createContext(new BotCampaignProfile({ content: '' }));

export class BotProfileProvider extends React.Component<{}, IBotProfile> {
  state = { mounted: false } as any;

  componentDidMount () {
    if (IS_DEV) {
      const botCampaignProfile = new BotCampaignProfile({ content: botProfileExample });
      botCampaignProfile.onMount((state) => this.setState(state));
    } else {
      ipcRenderer.on('BotProfile:loaded', (_: any, file: FileFromExplorer) => {
        const botCampaignProfile = new BotCampaignProfile(file);
        botCampaignProfile.onMount((state) => this.setState(state));
      });
    }
    
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
