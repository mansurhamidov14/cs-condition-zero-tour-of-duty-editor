import * as React from 'react';
import { BOT_PROFILE_INIT_EVENT } from '../../consts';
import { CareerMode } from '../../models/CareerMode';
import { EDifficulty, ICareerMode, IDifficultyModeState } from '../../models/types';
import { capitalizeFirstLetter } from '../../utils';
import { BotProfileContext } from '../BotProfile';

const { ipcRenderer } = window.require('electron');

const CareerModeContext = React.createContext(null as any);

export class CareerModeProvider extends React.Component<{}, ICareerMode> {
  state = { mounted: false } as any;
  static contextType = BotProfileContext;

  componentDidMount() {
    window.addEventListener(BOT_PROFILE_INIT_EVENT, () => {
      const careerMode = new CareerMode(this.context.allPlayers);

      Object.values(EDifficulty).forEach((difficulty) => {
        ipcRenderer.on(`Career${capitalizeFirstLetter(difficulty)}Missions:loaded`, (_: any, fileContent: string) => {
          careerMode.loadFromVdf(difficulty, fileContent);
        });
      });
  
      (window as any).careerMode = careerMode;
  
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
