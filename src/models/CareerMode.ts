import { CAREER_MODE_STATE_UPDATE_EVENT, CAREER_MODE_UNMOUNT, IS_DEV } from "../consts";
import { easyModeVdfExample, expertModeExample, hardModeVdfExample, normalModeVdfExample } from "../contexts/GameModeProvider/mocks";
import { DifficultyMode } from "./DifficultyMode";
import { EDifficulty, FileFromExplorer, ICareerMode, IDifficultyModeState, IPlayer } from "./types";

export class CareerMode implements ICareerMode {
    public easy: IDifficultyModeState;
    public normal: IDifficultyModeState;
    public hard: IDifficultyModeState;
    public expert: IDifficultyModeState;
    public mounted: boolean = false;

    constructor (public players: IPlayer[]) {
        this.easy = new DifficultyMode({ content: IS_DEV ? easyModeVdfExample : ''}, EDifficulty.EASY, this);
        this.normal = new DifficultyMode({ content: IS_DEV ? normalModeVdfExample : ''}, EDifficulty.NORMAL, this);
        this.hard = new DifficultyMode({ content: IS_DEV ? hardModeVdfExample : ''}, EDifficulty.HARD, this);
        this.expert = new DifficultyMode({ content: IS_DEV ? expertModeExample : ''}, EDifficulty.EXPERT, this);
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