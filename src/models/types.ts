interface Saveable {
    saved: boolean;
    save: () => void;
}

export interface IBotProfile extends Saveable {
    allPlayers: IPlayer[];
    filepath?: string;
    templates: ITemplate[];
    defaultConfig: IConfig;
    createPlayer: () => IPlayer;
    createTemplate: () => ITemplate;
    deletePlayer: (player: IPlayer) => void;
    deleteTemplate: (template: ITemplate) => void;
    onMount: (callback: (botProfile: IBotProfile) => void) => void;
    onDeletePlayer: (callback: (player: IPlayer) => void) => void;
    unmount: () => void;
}

export interface ITemplateOptions {
    name: string;
    config: IConfig;    
}

export interface IPlayerOptions extends ITemplateOptions {
    templates: string[];
}

export interface ITemplateBase extends ITemplateOptions {
    id: string;
    isNew: boolean;
    botProfile: IBotProfile;
    defaults?: ITemplateOptions;
}

export interface ITemplate extends ITemplateBase {
    save: (data: ITemplate | IPlayer) => void;
}

export interface IPlayer extends ITemplateBase, ITemplateOptions {
    templates: string[];
    save: (data: IPlayer | ITemplate) => void;
    defaults?: IPlayerOptions;
}

export interface IConfigOptions {
    Skill?: string;
    Aggression?: string;
    Teamwork?: string;
    Cost?: string;
    ReactionTime?: string;
    AttackDelay?: string;
    VoicePitch?: string;
    Skin?: string;
    WeaponPreference?: string[];
    Difficulty?: string[];
}

export interface IConfig extends Required<IConfigOptions> {
    defaults: Required<IConfigOptions>;
    set: (...[key, value]: Entry<Required<IConfigOptions>, keyof IConfigOptions>) => void;
    addWeaponPreference: (weapon: string) => void;
    editWeaponPreference: (index: number, weapon: string) => void;
    removeWeaponPreference: (index: number) => void;
}

interface IDifficultyModeBase {
    InitialPoints: number;
    MatchWins: number;
    MatchWinBy: number;
    CostAvailability: Record<number, number>;
}

export interface IDifficultyMode extends IDifficultyModeBase {
    Characters: string;
    Maps: Record<string, IMapOptions>
}

export type ITourCharacter = {
    player: IPlayer;
    isParticipating: boolean;
    toggleParticipation: () => void;
}

export interface IDifficultyModeState extends IDifficultyModeBase, Saveable {
    Characters: ITourCharacter[];
    Maps: IMap[];
    difficulty: EDifficulty;
    careerMode: ICareerMode;
    set: (key: DifficultyModePrimitives, value: number) => void;
    setCostAvailabilty: (cost: string, value: string) => void;
    mounted: boolean;
}

interface IMapConfigBase {
    minEnemies: number;
    threshold: number;
    FriendlyFire: number;
}

export interface IMapOptions extends IMapConfigBase {
    bots: string;
    tasks: string;
}

export interface IMapConfig extends IMapConfigBase {
    bots: string[];
    tasks: MissionTask[];
}

export interface IMap {
    id: string;
    name: string;
    config: IMapConfig;
    difficultyMode: IDifficultyModeState;
    parseTaskName: (task: MissionTask) => string;
    save: (data: IMap) => void;
}

export type Entry<O, K extends keyof O> = [K, (O[K] | null)];
export type Entries<O> = Entry<O, keyof O>[];

export enum EDifficulty {
    EASY = 'easy',
    NORMAL = 'normal',
    HARD = 'hard',
    EXPERT = 'expert'
}

export type DifficultyModeUpdateEventDetails = {
    difficulty: EDifficulty;
}

export type CareerModeDifficulties = Record<EDifficulty, IDifficultyModeState>;

export interface ICareerMode extends CareerModeDifficulties {
    mounted: boolean;
    players: IPlayer[];
    loadFromVdf: (difficulty: EDifficulty, file: FileFromExplorer, path: string) => void;
    handlePlayerDelete: (player: IPlayer) => void;
    onMount: (ccallback: (careerMode: ICareerMode) => void) => void;
    updateState: () => void;
    hasUnsavedFile: () => boolean;
}

export type MissionTask = {
    action: string;
    withWeapon?: string | undefined;
    amount?: number;
    option: string | null;
}

export type DifficultyModePrimitives = keyof Omit<IDifficultyModeBase, 'CostAvailability'>
export type MapPrimitives = keyof IMapConfigBase;

export type FileFromExplorer = {
    content: string;
    path?: string;
}
