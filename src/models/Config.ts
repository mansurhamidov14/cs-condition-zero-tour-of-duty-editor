import type { Entry, IBotProfile, IConfig, IConfigOptions } from "./types";

export class Config implements IConfig {
    Skill!: string;
    Aggression!: string;
    Teamwork!: string;
    Cost!: string;
    ReactionTime!: string;
    AttackDelay!: string;
    VoicePitch!: string;
    Skin!: string;
    WeaponPreference!: string[];
    defaults: IConfig['defaults'];
    Difficulty!: string[];

    constructor(config: IConfigOptions, private botProfile: IBotProfile) {
        this.defaults = JSON.parse(JSON.stringify(config));
        Object.assign(this, config);
    }

    public set(...[key, value]: Entry<IConfigOptions, keyof IConfigOptions>) {
        this[key] = value as any;
        this.botProfile.updateState();
    }

    public addWeaponPreference(weapon: string): void {
        if (this.hasWeaponPreference()) {
            this.WeaponPreference.push(weapon);
        } else {
            this.WeaponPreference = [weapon];
        }
        this.botProfile.updateState();
    }

    public editWeaponPreference(weaponIndex: number, value: string) {
        if (this.hasWeaponPreference()) {
            this.WeaponPreference[weaponIndex] = value;
            this.botProfile.updateState();
        } else {
            throw new Error('Player does not have any weapon preference');
        }
    }

    public removeWeaponPreference(weaponIndex: number) {
        if (this.hasWeaponPreference()) {
            this.WeaponPreference.splice(weaponIndex, 1);
            this.botProfile.updateState();
        } else {
            throw new Error('Player does not have any weapon preference');
        }
    }

    private hasWeaponPreference(): boolean {
        return Boolean(this.WeaponPreference?.length);
    }
}