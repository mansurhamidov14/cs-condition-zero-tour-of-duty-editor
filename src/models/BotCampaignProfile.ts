import { BOT_PROFILE_INIT_EVENT, BOT_PROFILE_STATE_UPDATE_EVENT, BOT_PROFILE_UNMOUNT, PLAYER_DELETED_EVENT } from "../consts";
import { Config } from "./Config";
import { Player } from "./Player";
import { Template } from "./Template";
import type { Entries, FileFromExplorer, IBotProfile, IConfig, IPlayer, ITemplate } from "./types";

const { ipcRenderer } = window.require('electron');

export class BotCampaignProfile implements IBotProfile {
    mounted = false;
    defaultConfig: IConfig;
    templates: ITemplate[];
    allPlayers: IPlayer[];
    saved: boolean = true;
    private filePath?: string;

    constructor (file: FileFromExplorer) {
        this.filePath = file.path;
        const lines = file.content.split('\n');
        const sanitizedLines = lines.filter(line => {
            const trimmed = line.trim();
            return trimmed && trimmed.indexOf('//') !== 0;
        });
        this.defaultConfig = this.getDefaultConfig(sanitizedLines);
        this.templates = this.getTemplates(sanitizedLines);
        this.allPlayers = this.getAllPlayers(sanitizedLines);
        (window as any).botProfile = this;
    }
    
    updateState(save: boolean = false): void {
        this.saved = save;
        window.dispatchEvent(new CustomEvent(BOT_PROFILE_STATE_UPDATE_EVENT));
    }

    createPlayer = (): IPlayer => {
        const newPlayer = new Player({
            name: `Player#${this.allPlayers.length + 1}`,
            templates:  [this.templates?.[0].name].filter(Boolean),
            config: { ...this.defaultConfig, WeaponPreference: [...this.defaultConfig.WeaponPreference] }
        }, this, false, true);
        this.allPlayers = [...this.allPlayers, newPlayer];
        return newPlayer;
    }

    deletePlayer = (player: IPlayer): void => {
        this.allPlayers = this.allPlayers.filter(({ id }) => id !== player.id);
        window.dispatchEvent(new CustomEvent<IPlayer>(PLAYER_DELETED_EVENT, { detail: player}));
        if (!player.isNew) this.updateState();
    }

    onDeletePlayer(callback: (player: IPlayer) => void) {
        window.addEventListener(PLAYER_DELETED_EVENT, ({ detail }:  CustomEventInit<IPlayer>) => {
            if (detail) {
                callback(detail);
            }
        })
    }

    deleteTemplate = (template: ITemplate): void => {
        this.templates = this.templates.filter(({ id }) => id !== template.id);
        this.allPlayers.forEach((player) => {
            if (player.templates.includes(template.name)) {
                player.templates = player.templates.filter((t) => t !== template.name)
            }
        });
        if (!template.isNew) this.updateState();
    }

    createTemplate = (): ITemplate => {
        const newTemplate = new Template({
            name: `Template#${this.templates.length + 1}`,
            config: { ...this.defaultConfig, WeaponPreference: [...this.defaultConfig.WeaponPreference] }
        }, this, false, true);
        this.templates = [...this.templates, newTemplate];
        return newTemplate;
    }

    onMount(callback: (botProfile: IBotProfile) => void) {
        this.mounted = true;
        callback(this);
        setTimeout(() => {
            window.dispatchEvent(new CustomEvent<IBotProfile>(BOT_PROFILE_INIT_EVENT, { detail: this }))
        }, 500);
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
        return new Config(config, this);
    }
    
    private getTemplates (lines: string[]) {
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
    
    private getAllPlayers (lines: string[]) {
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

    private getSavedFileContent = () => {
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

        return fileContent;
    }

    save = () => {
        if (this.filePath) {
            ipcRenderer.send('saveFile', { path: this.filePath, content: this.getSavedFileContent() });
            this.updateState(true);
        } else {
            this.saveAs();
        }
    }

    saveAs = () => {
        ipcRenderer.send('saveFileAs', { content: this.getSavedFileContent(), extension: 'db', name: 'BotCampaignProfile' }); 
        ipcRenderer.on('saveFileAsResponse', (_: any, path: string) => {
            if (path) {
                this.filePath = path;
                this.updateState(true);
            }
            ipcRenderer.removeAllListeners('saveFileAsResponse');
        });
    }
}
