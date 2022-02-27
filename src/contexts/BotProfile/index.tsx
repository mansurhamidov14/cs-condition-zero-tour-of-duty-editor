import * as React from "react";
import { IBotProfile } from "../../models/types";
import { BotCampaignProfile } from "../../models/BotCampaignProfile";
import { botProfileExample } from "./mocks";

export const BotProfileContext = React.createContext(new BotCampaignProfile(''));

export class BotProfileProvider extends React.Component<{}, IBotProfile> {
  state = {} as any;
  constructor (props: {}) {
    super(props);
  }

  componentDidMount () {
    const botCampaignProfile = new BotCampaignProfile(botProfileExample);
    botCampaignProfile.onMount((state) => this.setState(state));
  }

  render () {
    return (
      <BotProfileContext.Provider value={this.state}>
        {this.state.mounted ? this.props.children : <div />}
      </BotProfileContext.Provider>
    );
  }
}

export function useBotProfile () {
  return React.useContext(BotProfileContext);
}
