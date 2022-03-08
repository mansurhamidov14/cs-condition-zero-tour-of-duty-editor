import * as VDF from "vdf-parser";
import { capitalizeFirstLetter } from "../utils";
import { Character } from "./Character";
import { GameMap } from "./GameMap";
import { EDifficulty, FileFromExplorer, IDifficultyMode, IDifficultyModeState, MissionTask } from "./types";

const { ipcRenderer } = window.require('electron');

export class DifficultyMode implements IDifficultyModeState {
    InitialPoints: number = 0;
    MatchWins: number = 0;
    MatchWinBy: number = 0;
    Characters: IDifficultyModeState['Characters'] = [];
    Maps: IDifficultyModeState['Maps'] = [];
    CostAvailability: IDifficultyModeState['CostAvailability'] = {};
    mounted: boolean = false;
    saved: boolean = true;

    constructor (
        file: FileFromExplorer,
        public difficulty: EDifficulty,
        public careerMode: IDifficultyModeState['careerMode'],
        private filePath?: string
    ) {
        if (file.content) {
            const vdfData = ((VDF.parse(file.content) as any).CareerGame) as IDifficultyMode;
            this.filePath = file.path;
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
            this.mounted = Boolean(file.content.trim());
        }
    }

    updateState(save: boolean = false) {
        this.saved = save;
        this.careerMode.updateState();
    }

    public set = (...[key, value]: Parameters<IDifficultyModeState['set']>): void => {
        this[key] = value;
        this.updateState();
    }

    public setCostAvailabilty (cost: string, value: string) {
        this.CostAvailability[Number(cost)] = Number(value);
        this.updateState();
    }

    private getSavedFileContent = () => {
        const outputMaps: IDifficultyMode['Maps'] = {};
        this.Maps.forEach((gameMap) => {
            const taskKeysOrder: (keyof MissionTask)[] = ['action', 'amount', 'withWeapon', 'option'];
            const tasks = gameMap.config.tasks.map((task) => {
                const taskOutput = taskKeysOrder.map((key) => task[key]).filter(Boolean).join(" ");
                return `'${taskOutput}'`;
            }).join(" ");
            outputMaps[gameMap.name] = {
                minEnemies: gameMap.config.minEnemies,
                bots: gameMap.config.bots.map(bot => bot.name).join(" "),
                threshold: gameMap.config.threshold,
                tasks,
                FriendlyFire: gameMap.config.FriendlyFire
            };
        })
        const outputVDF: IDifficultyMode = {
            InitialPoints: this.InitialPoints,
            MatchWins: this.MatchWins,
            MatchWinBy: this.MatchWinBy,
            CostAvailability: this.CostAvailability,
            Characters: this.Characters.filter(({ isParticipating }) => isParticipating).map(({ player }) => player.name).join(" "),
            Maps: outputMaps
        };

        return VDF.stringify({CareerGame: outputVDF}, true);
    }

    public save = () => {
        if (this.filePath) {
            ipcRenderer.send('saveFile', { path: this.filePath, content: this.getSavedFileContent() });
            this.updateState(true);
        } else {
            this.saveAs();
        }
    }

    public saveAs = () => {
        ipcRenderer.send('saveFileAs', {
            content: this.getSavedFileContent(),
            extension: 'vdf',
            name: `Career${capitalizeFirstLetter(this.difficulty)}Missions`
        });
        ipcRenderer.on('saveFileAsResponse', (_: any, path: string) => {
            if (path) {
                this.filePath = path;
                this.updateState(true);
            }
            ipcRenderer.removeAllListeners('saveFileAsResponse');
        });
    }
}
