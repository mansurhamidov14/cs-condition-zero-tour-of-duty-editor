export interface IBotProfile {
    allPlayers: IPlayer[];
    templates: ITemplate[];
    defaultConfig: IConfig;
    createPlayer: () => IPlayer;
    createTemplate: () => ITemplate;
    deletePlayer: (playerId: string) => void;
    deleteTemplate: (template: ITemplate) => void;
    export: () => any;
    onMount: (callback: (botProfile: IBotProfile) => void) => void;
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
    applyChanges: (data: ITemplate | IPlayer) => void;
}

export interface IPlayer extends ITemplateBase, ITemplateOptions {
    templates: string[];
    applyChanges: (data: IPlayer | ITemplate) => void;
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

export interface IDifficultyModeState extends IDifficultyModeBase {
    Characters: string[];
    Maps: IMap[];
}

interface IMapOptions {
    bots: string;
    minEnemies: number;
    threshold: number;
    tasks: string;
    FriendlyFire: 0 | 1;
}

export interface IMap {
    id: string;
    name: string;
    options: IMapOptions;
}

export type Entry<O, K extends keyof O> = [K, (O[K] | null)]
export type Entries<O> = Entry<O, keyof O>[]

