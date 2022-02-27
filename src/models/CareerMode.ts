import { CAREER_MODE_STATE_UPDATE_EVENT, CAREER_MODE_UNMOUNT } from "../consts";
import { DifficultyMode } from "./DifficultyMode";
import { EDifficulty, ICareerMode } from "./types";

export class CareerMode implements ICareerMode {
    public easy: DifficultyMode;
    public normal: DifficultyMode;
    public hard: DifficultyMode;
    public expert: DifficultyMode;
    public mounted: boolean = false;

    constructor (vdfContents: Record<EDifficulty, string>) {
        this.easy = new DifficultyMode(vdfContents.easy, EDifficulty.EASY, this);
        this.normal = new DifficultyMode(vdfContents.normal, EDifficulty.NORMAL, this);
        this.hard = new DifficultyMode(vdfContents.hard, EDifficulty.HARD, this);
        this.expert = new DifficultyMode(vdfContents.expert, EDifficulty.EXPERT, this);
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
}