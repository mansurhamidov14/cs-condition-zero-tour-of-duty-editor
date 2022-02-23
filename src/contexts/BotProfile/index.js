import React from "react";
import { BotCampaignProfile } from "../../models/BotCampaignProfile";
import { mockContent } from "./mocks";

export const BotProfileContext = React.createContext(new BotCampaignProfile(''));

export class BotProfileProvider extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      defaultConfig: {},
      templates: [],
      allPlayers: [],
    }; 
  }

  componentDidMount () {
    const botCampaignProfile = new BotCampaignProfile(mockContent);
    botCampaignProfile.onMount((state) => this.setState(state));
  }

  render () {
    return (
      <BotProfileContext.Provider value={this.state}>
        {this.props.children}
      </BotProfileContext.Provider>
    );
  }
}
