import * as React from 'react';
import { CareerMode } from '../../models/CareerMode';
import type { EDifficulty, ICareerMode, IDifficultyModeState } from '../../models/types';
import { easyModeVdfExample, expertModeExample, hardModeVdfExample, normalModeVdfExample } from './mocks';

const CareerModeContext = React.createContext(null as any);

export class CareerModeProvider extends React.Component<{}, ICareerMode> {
  state = {} as any;

  componentDidMount() {
    const careerMode = new CareerMode({
      easy: easyModeVdfExample,
      normal: normalModeVdfExample,
      hard: hardModeVdfExample,
      expert: expertModeExample
    });

    (window as any).careerMode = careerMode;

    careerMode.onMount(updated => this.setState(updated))
  }

  render() {
    return (
      <CareerModeContext.Provider value={this.state}>
        {this.state.mounted ? this.props.children : <div />}
      </CareerModeContext.Provider>
    );
  }
}

export function useDifficultyMode (difficulty: EDifficulty): IDifficultyModeState {
  return React.useContext(CareerModeContext)[difficulty];
}
