import * as VDF from "vdf-parser";
import { Character } from "./Character";
import { GameMap } from "./GameMap";
import { EDifficulty, IDifficultyMode, IDifficultyModeState, MissionTask } from "./types";

export class DifficultyMode implements IDifficultyModeState {
    InitialPoints: number = 0;
    MatchWins: number = 0;
    MatchWinBy: number = 0;
    Characters: IDifficultyModeState['Characters'] = [];
    Maps: IDifficultyModeState['Maps'] = [];
    CostAvailability: IDifficultyModeState['CostAvailability'] = {};
    mounted: boolean = false;
    saved: boolean = true;

    constructor (fileContent: string, public difficulty: EDifficulty, public careerMode: IDifficultyModeState['careerMode']) {
        if (fileContent) {
            const vdfData = ((VDF.parse(fileContent) as any).CareerGame) as IDifficultyMode;
            console.log(vdfData);
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
            this.mounted = Boolean(fileContent.trim());
        }
    }

    public set = (...[key, value]: Parameters<IDifficultyModeState['set']>): void => {
        this[key] = value;
        this.saved = false;
        this.careerMode.updateState();
    }

    public setCostAvailabilty (cost: string, value: string) {
        this.CostAvailability[Number(cost)] = Number(value);
        this.saved = false;
        this.careerMode.updateState();
    }

    public export() {
        const outputMaps: IDifficultyMode['Maps'] = {};
        this.Maps.forEach((gameMap) => {
            const taskKeysOrder: (keyof MissionTask)[] = ['action', 'amount', 'withWeapon', 'option'];
            const tasks = gameMap.config.tasks.map((task) => {
                const taskOutput = taskKeysOrder.map((key) => task[key]).filter(Boolean).join(" ");
                return `'${taskOutput}'`;
            }).join(" ");
            outputMaps[gameMap.name] = {
                minEnemies: gameMap.config.minEnemies,
                bots: gameMap.config.bots.join(" "),
                threshold: gameMap.config.threshold,
                tasks,
                FriendlyFire: gameMap.config.FriendlyFire
            }
        })
        const outputVDF: IDifficultyMode = {
            InitialPoints: this.InitialPoints,
            MatchWins: this.MatchWins,
            MatchWinBy: this.MatchWinBy,
            CostAvailability: this.CostAvailability,
            Characters: this.Characters.filter(({ isParticipating }) => isParticipating).map(({ player }) => player.name).join(" "),
            Maps: outputMaps
        };

        const fileContent = VDF.stringify({CareerGame: outputVDF}, true);

        var file = new Blob([fileContent], { type: 'text/plain '});
        return window.open(URL.createObjectURL(file), '_blank');
    }
}
