import { BOT_PROFILE_STATE_UPDATE_EVENT, BOT_PROFILE_UNMOUNT } from "../consts";
import { Config } from "./Config";
import { Player } from "./Player";
import { StateUpdater } from "./StateUpdater";
import { Template } from "./Template";
import type { Entries, IBotProfile, IConfig, IPlayer, ITemplate } from "./types";

export class BotCampaignProfile extends StateUpdater implements IBotProfile {
    mounted = false;
    defaultConfig: IConfig;
    templates: ITemplate[];
    allPlayers: IPlayer[];

    constructor (fileContent: string) {
        super();
        const lines = fileContent.split('\n');
        const sanitizedLines = lines.filter(line => {
            const trimmed = line.trim();
            return trimmed && trimmed.indexOf('//') !== 0;
        });
        this.defaultConfig = this.getDefaultConfig(sanitizedLines);
        this.templates = this.getTemplates(sanitizedLines);
        this.allPlayers = this.getAllPlayers(sanitizedLines);
        (window as any).botProfile = this;
    }

    createPlayer = (): IPlayer => {
        const newPlayer = new Player({
            name: `Player#${this.allPlayers.length + 1}`,
            templates:  [this.templates?.[0].name].filter(Boolean),
            config: JSON.parse(JSON.stringify(this.defaultConfig))
        }, this, false, true);
        this.allPlayers.push(newPlayer);
        this.updateState();
        return newPlayer;
    }

    deletePlayer = (playerId: string): void => {
        this.allPlayers = this.allPlayers.filter(({ id }) => id !== playerId);
        this.updateState();
    }

    deleteTemplate = (template: ITemplate): void => {
        this.templates = this.templates.filter(({ id }) => id !== template.id);
        this.allPlayers.forEach((player) => {
            if (player.templates.includes(template.name)) {
                player.templates = player.templates.filter((t) => t !== template.name)
            }
        });
        this.updateState();
    }

    createTemplate = (): ITemplate => {
        const newTemplate = new Template({
            name: `Template#${this.templates.length + 1}`,
            config: JSON.parse(JSON.stringify(this.defaultConfig))
        }, this, false, true);
        this.templates.push(newTemplate);
        this.updateState();
        return newTemplate;
    }

    onMount(callback: (botProfile: IBotProfile) => void) {
        this.mounted = true;
        callback(this);
        const updateState = () => {
            callback(this);
        }
        const unmountEvent = () => {
            window.removeEventListener(BOT_PROFILE_STATE_UPDATE_EVENT, updateState);
            window.removeEventListener(BOT_PROFILE_UNMOUNT, unmountEvent);
        }
        window.addEventListener(BOT_PROFILE_STATE_UPDATE_EVENT, updateState);
        window.addEventListener(BOT_PROFILE_UNMOUNT, unmountEvent);
    }

    unmount() {
        if (this.mounted) {
            window.dispatchEvent(new CustomEvent(BOT_PROFILE_UNMOUNT));
        }
    }

    private defaultConfigStarts (line: string): boolean {
        return line.indexOf('Default') === 0;
    }
    
    private templateStarts (line: string): boolean {
        return line.indexOf('Template') === 0;
    }
    
    private playerStarts (line: string): boolean {
        return (
            !this.defaultConfigStarts(line) &&
            !this.templateStarts(line) &&
            !this.blockEnds(line) &&
            Boolean(line.trim())
            && line.indexOf('\t') !== 0
        );
    }
    
    private blockEnds (line: string): boolean {
        return line.indexOf('End') === 0;
    }
    
    private clearComments (line: string): string {
        var [cleanLine] = line.split('//');
        return cleanLine.trim();
    }
    
    private getEntries (cleanLine: string): string[] {
        return cleanLine.split('=').map(item => item.trim());
    }
    
    private getDefaultConfig (lines: string[]): IConfig {
        let ignoreNextLine = true;
        const entries = [];
        const weaponPreference: IConfig['WeaponPreference'] = [];
        lines.forEach((line) => {
            var cleanLine = this.clearComments(line);
            if (this.defaultConfigStarts(cleanLine)) {
                ignoreNextLine = false;
            } else if (this.blockEnds(cleanLine)) {
                ignoreNextLine = true;
            } else if (!ignoreNextLine) {
                var [key, value] = this.getEntries(cleanLine);
                if (key === 'WeaponPreference' && value !== 'none') {
                    weaponPreference.push(value);
                } else {
                    entries.push([key, key === 'Difficulty' ? value.split('+') : value]);
                }
            }
        });
        entries.push(['WeaponPreference', weaponPreference]);
        var config = Object.fromEntries(entries);
        return new Config(config);
    }
    
    getTemplates (lines: string[]) {
        let ignoreNextLine = true;
        const templates: ITemplate[] = [];
        let weaponPreference: Required<IConfig>['WeaponPreference'] = [];
        let currentTemplateEntries: Entries<IConfig> = [];
        let currentTemplateName = '';
    
        lines.forEach((line) => {
            var cleanLine = this.clearComments(line);
            if (this.templateStarts(line)) {
                ignoreNextLine = false;
                currentTemplateName = cleanLine.split(' ')[1];
            } else if (!ignoreNextLine && this.blockEnds(line)) {
                currentTemplateEntries.push(['WeaponPreference', weaponPreference?.length ? weaponPreference : null]);
                const template = new Template({
                    name: currentTemplateName,
                    config: Object.fromEntries(currentTemplateEntries) as any
                }, this, true);
                templates.push(template);
                currentTemplateEntries = [];
                weaponPreference = [];
                ignoreNextLine = true;
            } else if (!ignoreNextLine) {
                var [key, value] = this.getEntries(cleanLine);
                if (key === 'WeaponPreference') {
                    weaponPreference.push(value);
                } else {
                    currentTemplateEntries.push([key as keyof ITemplate['config'], key === 'Difficulty' ? value.split('+') : value]);
                }
                
            }
        });
        
        return templates;
    }
    
    getAllPlayers (lines: string[]) {
        var ignoreNextLine = true;
        const players: IPlayer[] = [];
        let weaponPreference: Required<IConfig>['WeaponPreference'] = [];
        let currentPlayerEntries: Entries<IConfig> = [];
        let currentPlayerName = '';
        let currentPlayerTemplates: string[];
        
        lines.forEach((line) => {
            var cleanLine = this.clearComments(line);
            if (this.playerStarts(line)) {
                ignoreNextLine = false;
                var [templatesConcat, playerName] = cleanLine.split(' ');
                currentPlayerName = playerName;
                currentPlayerTemplates = templatesConcat.split('+');
            } else if (!ignoreNextLine && this.blockEnds(line)) {
                currentPlayerEntries.push(['WeaponPreference', weaponPreference.length ? weaponPreference : null]);
                const player = new Player({
                    name: currentPlayerName,
                    templates: currentPlayerTemplates,
                    config: Object.fromEntries(currentPlayerEntries) as any
                }, this, true);
                players.push(player);
                weaponPreference = [];
                currentPlayerEntries = [];
            } else if (!ignoreNextLine) {
                var [key, value] = this.getEntries(cleanLine);
                if (key === 'WeaponPreference') {
                    weaponPreference.push(value);
                } else {
                    currentPlayerEntries.push([key as keyof IPlayer['config'], key === 'Difficulty' ? value.split('+') : value]);
                }
            }
        });
        
        return players;
    }

    export = () => {
        const fields: (keyof IConfig)[] = ['Skill', 'Aggression', 'ReactionTime', 'AttackDelay', 'Teamwork', 'WeaponPreference', 'Cost', 'Difficulty', 'VoicePitch', 'Skin'];
        let fileContent = `Default\n`;
        fields.forEach(field =>  {
            const paramValue = this.defaultConfig[field] as any;
            if (field === 'WeaponPreference') {
                if ((paramValue as []).length) {
                    paramValue.forEach((value: string) => fileContent += `\t${field} = ${value}\n`);
                } else {
                    fileContent += `\t${field} = none\n`;
                }
            } else if (paramValue) {
                if (field === 'Difficulty') {
                    fileContent += `\t${field} = ${paramValue.join('+')}\n`;
                } else {
                    fileContent += `\t${field} = ${paramValue}\n`;
                }
            }
        });
        fileContent += 'End\n\n';

        this.templates.forEach(template => {
            fileContent += `Template ${template.name}\n`;
            fields.forEach(field => {
                const paramValue = template.config[field] as any;
                if (field === 'WeaponPreference' && paramValue?.length) {
                    paramValue.forEach((value: string) => fileContent += `\t${field} = ${value}\n`);
                } else if (field === 'Difficulty' && paramValue?.length) {
                    fileContent += `\t${field} = ${paramValue.join('+')}\n`;
                } else if (paramValue) {
                    fileContent += `\t${field} = ${paramValue}\n`;
                }
            });
            fileContent += `End\n\n`;
        });

        this.allPlayers.forEach(player => {
            fileContent += `${player.templates.join('+')} ${player.name}\n`;
            fields.forEach(field => {
                const paramValue = player.config[field] as any;
                if (field === 'WeaponPreference' && paramValue?.length) {
                    paramValue.forEach((value: string) => fileContent += `\t${field} = ${value}\n`);
                } else if (field === 'Difficulty' && paramValue?.length) {
                    fileContent += `\t${field} = ${paramValue.join('+')}\n`;
                } else if (paramValue) {
                    fileContent += `\t${field} = ${paramValue}\n`;
                }
            });
            fileContent += `End\n\n`;
        });

        var file = new Blob([fileContent], { type: 'text/plain '});
        return window.open(URL.createObjectURL(file), '_blank');
    }
}
