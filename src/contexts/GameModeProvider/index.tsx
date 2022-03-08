import * as React from "react";
import { BOT_PROFILE_INIT_EVENT } from "../../consts";
import { CareerMode } from "../../models/CareerMode";
import { EDifficulty, IBotProfile, ICareerMode, IDifficultyModeState } from "../../models/types";
import { capitalizeFirstLetter } from "../../utils";
import { BotProfileContext, useBotProfile } from "../BotProfile";
import { TypeTabsContext, useTabs } from "../Tabs";

const { ipcRenderer } = window.require("electron");

const CareerModeContext = React.createContext(null as any);

type Props = {
  BotProfileContext: IBotProfile;
  TabsContext: TypeTabsContext
}

class _CareerModeProvider extends React.Component<Props, ICareerMode> {
  state = { mounted: false } as any;

  componentDidMount() {
    window.addEventListener(BOT_PROFILE_INIT_EVENT, ({ detail: botProfile }: CustomEventInit<IBotProfile>) => {
      const careerMode = new CareerMode(this.props.BotProfileContext.allPlayers);

      Object.values(EDifficulty).forEach((difficulty) => {
        ipcRenderer.on(`Career${capitalizeFirstLetter(difficulty)}Missions:loaded`, (_: any, file: { content: string, path: string; }) => {
          careerMode.loadFromVdf(difficulty, file, file.path);
          this.props.TabsContext.enableTabGroup('careerMode');
          this.props.TabsContext.setRootTab('careerMode');
          this.props.TabsContext.setCareerModeTab(difficulty);
        });
      });
  
      (window as any).careerMode = careerMode;

      botProfile?.onCreatePlayer((player) => careerMode.handlePlayerAdd(player));
      botProfile?.onDeletePlayer((player) => careerMode.handlePlayerDelete(player));
      botProfile?.onEditPlayer(() => careerMode.setUnsaved());
      careerMode.onMount(updated => this.setState(updated));
    });
  }

  render() {
    return (
      <CareerModeContext.Provider value={this.state}>
        {this.props.children}
      </CareerModeContext.Provider>
    );
  }
}

export const CareerModeProvider: React.FC = ({ children}) => {
  const BotProfileContext = useBotProfile();
  const TabsContext = useTabs();

  return (
    <_CareerModeProvider {...{ BotProfileContext, TabsContext }}>
      {children}
    </_CareerModeProvider>
  )
}

export function useCareerMode(): ICareerMode {
  return React.useContext(CareerModeContext);
}

export function useCareerModeLoadingStatus(): boolean {
  return React.useContext(CareerModeContext).mounted;
}

export function useDifficultyMode (difficulty: EDifficulty): IDifficultyModeState {
  return React.useContext(CareerModeContext)[difficulty];
}
