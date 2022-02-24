import { BOT_PROFILE_STATE_UPDATE_EVENT, BOT_PROFILE_UNMOUNT } from "../consts";
import { Config } from "./Config";
import { Player } from "./Player";
import { StateUpdater } from "./StateUpdater";
import { Template } from "./Template";

export class BotCampaignProfile extends StateUpdater {
    mounted = false;

    constructor (fileContent) {
        super();
        const lines = fileContent.split('\n');
        const sanitizedLines = lines.filter(line => {
            const trimmed = line.trim();
            return trimmed && trimmed.indexOf('//') !== 0;
        });
        this.allPlayers = this.getAllPlayers(sanitizedLines);
        this.defaultConfig = this.getDefaultConfig(sanitizedLines);
        this.templates = this.getTemplates(sanitizedLines);
        window.botProfile = this;
    }

    createPlayer = () => {
        const newPlayer = new Player({
            name: `Player#${this.allPlayers.length + 1}`,
            templates:  [this.templates?.[0].name].filter(Boolean),
            config: JSON.parse(JSON.stringify(this.defaultConfig))
        }, this, false, true);
        this.allPlayers.push(newPlayer);
        this.updateState();
        return newPlayer;
    }

    deletePlayer = (playerId) => {
        this.allPlayers = this.allPlayers.filter(({ id }) => id !== playerId);
        this.updateState();
    }

    deleteTemplate = (template) => {
        this.templates = this.templates.filter(({ id }) => id !== template.id);
        this.allPlayers.forEach((player) => {
            if (player.templates.includes(template.name)) {
                player.templates = player.templates.filter((t) => t !== template.name)
            }
        });
        this.updateState();
    }

    createTemplate = () => {
        const newTemplate = new Template({
            name: `Template#${this.templates.length + 1}`,
            config: JSON.parse(JSON.stringify(this.defaultConfig))
        }, this, false, true);
        this.templates.push(newTemplate);
        this.updateState();
        return newTemplate;
    }

    onMount(callback) {
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

    defaultConfigStarts (line) {
        return line.indexOf('Default') === 0;
    }
    
    templateStarts (line) {
        return line.indexOf('Template') === 0;
    }
    
    playerStarts (line) {
        return (
            !this.defaultConfigStarts(line) &&
            !this.templateStarts(line) &&
            !this.blockEnds(line) &&
            line.trim()
            && line.indexOf('\t') !== 0
        );
    }
    
    blockEnds (line) {
        return line.indexOf('End') === 0;
    }
    
    clearComments (line) {
        var [cleanLine] = line.split('//');
        return cleanLine.trim();
    }
    
    getEntries (cleanLine) {
        return cleanLine.split('=').map(item => item.trim())
    }
    
    getDefaultConfig (lines) {
        var ignoreNextLine = true;
        var entries = [];
        var weaponPreference = [];
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
    
    getTemplates (lines) {
        var ignoreNextLine = true;
        var templates = [];
        var weaponPreference = [];
        var currentTemplateEntries = [];
        var currentTemplateName = '';
    
        lines.forEach((line) => {
            var cleanLine = this.clearComments(line);
            if (this.templateStarts(line)) {
                ignoreNextLine = false;
                currentTemplateName = cleanLine.split(' ')[1];
            } else if (!ignoreNextLine && this.blockEnds(line)) {
                currentTemplateEntries.push(['WeaponPreference', weaponPreference.length ? weaponPreference : null]);
                const template = new Template({
                    name: currentTemplateName,
                    config: Object.fromEntries(currentTemplateEntries)
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
                    currentTemplateEntries.push([key, key === 'Difficulty' ? value.split('+') : value]);
                }
                
            }
        });
        
        return templates;
    }
    
    getAllPlayers (lines) {
        var ignoreNextLine = true;
        var players = [];
        var weaponPreference = [];
        var currentPlayerEntries = [];
        var currentPlayerName = '';
        var currentPlayerTemplates;
        
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
                    config: Object.fromEntries(currentPlayerEntries)
                }, this, true);
                players.push(player);
                weaponPreference = [];
                currentPlayerEntries = [];
            } else if (!ignoreNextLine) {
                var [key, value] = this.getEntries(cleanLine);
                if (key === 'WeaponPreference') {
                    weaponPreference.push(value);
                } else {
                    currentPlayerEntries.push([key, key === 'Difficulty' ? value.split('+') : value]);
                }
            }
        });
        
        return players;
    }

    export() {
        const fields = ['Skill', 'Aggression', 'ReactionTime', 'AttackDelay', 'Teamwork', 'WeaponPreference', 'Cost', 'Difficulty', 'VoicePitch', 'Skin'];
        let fileContent = `Default\n`;
        fields.forEach(field =>  {
            const paramValue = this.defaultConfig[field];
            if (field === 'WeaponPreference') {
                if (paramValue?.length) {
                    paramValue.forEach(value => fileContent += `\t${field} = ${value}\n`);
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
                const paramValue = template.config[field];
                if (field === 'WeaponPreference' && paramValue?.length) {
                    paramValue.forEach((value) => fileContent += `\t${field} = ${value}\n`);
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
                const paramValue = player.config[field];
                if (field === 'WeaponPreference' && paramValue?.length) {
                    paramValue.forEach((value) => fileContent += `\t${field} = ${value}\n`);
                } else if (field === 'Difficulty' && paramValue?.length) {
                    fileContent += `\t${field} = ${paramValue.join('+')}\n`;
                } else if (paramValue) {
                    fileContent += `\t${field} = ${paramValue}\n`;
                }
            });
            fileContent += `End\n\n`;
        });

        var file = new Blob([fileContent], { type: 'text/plain '});
        return URL.createObjectURL(file);
    }
}
