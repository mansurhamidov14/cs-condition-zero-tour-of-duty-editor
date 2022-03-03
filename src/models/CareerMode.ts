import { CAREER_MODE_STATE_UPDATE_EVENT, CAREER_MODE_UNMOUNT } from "../consts";
import { DifficultyMode } from "./DifficultyMode";
import { EDifficulty, FileFromExplorer, ICareerMode, IPlayer } from "./types";

export class CareerMode implements ICareerMode {
    public easy: DifficultyMode;
    public normal: DifficultyMode;
    public hard: DifficultyMode;
    public expert: DifficultyMode;
    public mounted: boolean = false;

    constructor (public players: IPlayer[]) {
        this.easy = new DifficultyMode({ content: ''}, EDifficulty.EASY, this);
        this.normal = new DifficultyMode({ content: ''}, EDifficulty.NORMAL, this);
        this.hard = new DifficultyMode({ content: ''}, EDifficulty.HARD, this);
        this.expert = new DifficultyMode({ content: ''}, EDifficulty.EXPERT, this);
    }

    handlePlayerDelete (player: IPlayer): void {
        Object.values(EDifficulty).forEach((difficulty) => {
            this[difficulty].Characters = this[difficulty].Characters.filter((character) => {
                return character.player.id !== player.id;
            });
            this[difficulty].Maps.forEach((gameMap) => {
                gameMap.config.bots = gameMap.config.bots.filter(bot => bot !== player.name);
            });
        });
    }

    loadFromVdf (difficulty: EDifficulty, file: FileFromExplorer, path: string) {
        this[difficulty] = new DifficultyMode(file, difficulty, this, path);
        this.updateState();
    }

    onMount(callback: (difficultyMode: ICareerMode) => void) {
        this.mounted = true;
        callback(this);
        const updateState = () => {
            callback(this);
        }
        const unmountEvent = () => {
            window.removeEventListener(CAREER_MODE_STATE_UPDATE_EVENT, updateState);
            window.removeEventListener(CAREER_MODE_UNMOUNT, unmountEvent);
        }
        window.addEventListener(CAREER_MODE_STATE_UPDATE_EVENT, updateState);
        window.addEventListener(CAREER_MODE_UNMOUNT, unmountEvent);
    }

    unmount() {
        window.dispatchEvent(new CustomEvent(CAREER_MODE_UNMOUNT));
    }

    updateState() {
        window.dispatchEvent(new CustomEvent(CAREER_MODE_STATE_UPDATE_EVENT));
    }

    hasUnsavedFile = (): boolean => {
        return Object.values(EDifficulty).some((difficulty) => !this[difficulty].saved);
    }
}