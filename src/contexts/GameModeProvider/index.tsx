import * as React from 'react';
import { BOT_PROFILE_INIT_EVENT } from '../../consts';
import { CareerMode } from '../../models/CareerMode';
import { EDifficulty, IBotProfile, ICareerMode, IDifficultyModeState } from '../../models/types';
import { capitalizeFirstLetter } from '../../utils';
import { BotProfileContext } from '../BotProfile';

const { ipcRenderer } = window.require('electron');

const CareerModeContext = React.createContext(null as any);

export class CareerModeProvider extends React.Component<{}, ICareerMode> {
  state = { mounted: false } as any;
  static contextType = BotProfileContext;

  componentDidMount() {
    window.addEventListener(BOT_PROFILE_INIT_EVENT, ({ detail: botProfile }: CustomEventInit<IBotProfile>) => {
      const careerMode = new CareerMode(this.context.allPlayers);

      Object.values(EDifficulty).forEach((difficulty) => {
        ipcRenderer.on(`Career${capitalizeFirstLetter(difficulty)}Missions:loaded`, (_: any, file: { content: string, path: string; }) => {
          careerMode.loadFromVdf(difficulty, file, file.path);
        });
      });
  
      (window as any).careerMode = careerMode;

      botProfile?.onDeletePlayer((player) => careerMode.handlePlayerDelete(player));
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

export function useCareerMode(): ICareerMode {
  return React.useContext(CareerModeContext);
}

export function useCareerModeLoadingStatus(): boolean {
  return React.useContext(CareerModeContext).mounted;
}

export function useDifficultyMode (difficulty: EDifficulty): IDifficultyModeState {
  return React.useContext(CareerModeContext)[difficulty];
}
