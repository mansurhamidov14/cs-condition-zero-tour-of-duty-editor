import * as VDF from "vdf-parser";
import { Character } from "./Character";
import { GameMap } from "./GameMap";
import { EDifficulty, IDifficultyMode, IDifficultyModeState } from "./types";

export class DifficultyMode implements IDifficultyModeState {
    InitialPoints: number;
    MatchWins: number;
    MatchWinBy: number;
    Characters: IDifficultyModeState['Characters'];
    Maps: IDifficultyModeState['Maps'];
    CostAvailability: IDifficultyModeState['CostAvailability'];

    constructor (fileContent: string, public difficulty: EDifficulty, public careerMode: IDifficultyModeState['careerMode']) {
        const vdfData = ((VDF.parse(fileContent) as any).CareerGame) as IDifficultyMode;
        this.InitialPoints = vdfData.InitialPoints;
        this.MatchWins = vdfData.MatchWins;
        this.MatchWinBy = vdfData.MatchWinBy;
        this.CostAvailability = vdfData.CostAvailability;
        const characterNamesArray = vdfData.Characters.replaceAll('\t', ' ').split(' ').map(players => players.trim());
        this.Characters = careerMode.players.map((player) => {
            return new Character(player, characterNamesArray.includes(player.name), this);
        }) 
        this.Maps = Object.entries(vdfData.Maps).map(([mapName, options]) => {
            return new GameMap(mapName, options, this);
        });
    }

    public set = (...[key, value]: Parameters<IDifficultyModeState['set']>): void => {
        this[key] = value;
        this.careerMode.updateState();
    }

    public setCostAvailabilty (cost: string, value: string) {
        this.CostAvailability[Number(cost)] = Number(value);
        this.careerMode.updateState();
    }
}
