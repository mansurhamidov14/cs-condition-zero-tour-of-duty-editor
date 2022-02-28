import { IDifficultyModeState, IPlayer, ITourCharacter } from "./types";

export class Character implements ITourCharacter {
    constructor(public player: IPlayer, public isParticipating: boolean, public difficultyMode: IDifficultyModeState) {}

    toggleParticipation() {
        console.log(this);
        this.isParticipating = !this.isParticipating;
        this.difficultyMode.careerMode.updateState();
    }
}