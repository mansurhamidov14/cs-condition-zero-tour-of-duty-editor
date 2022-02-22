import { BOT_PROFILE_STATE_UPDATE_EVENT, BOT_PROFILE_UNMOUNT } from "../consts";
import { Player } from "./Player";
import { Template } from "./Template";

export class BotCampaignProfile {
    mounted = false;

    constructor (fileContent) {
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
                if (key === 'WeaponPreference') {
                    weaponPreference.push(value);
                } else {
                    entries.push([key, value]);
                }
                
            }
        });
        entries.push(['WeaponPreference', weaponPreference]);
        return Object.fromEntries(entries)
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
                currentTemplateEntries.push(['WeaponPreference', weaponPreference]);
                const template = new Template({
                    name: currentTemplateName,
                    config: Object.fromEntries(currentTemplateEntries)
                }, this);
                templates.push(template);
                currentTemplateEntries = [];
                weaponPreference = [];
                ignoreNextLine = true;
            } else if (!ignoreNextLine) {
                var [key, value] = this.getEntries(cleanLine);
                if (key === 'WeaponPreference') {
                    weaponPreference.push(value);
                } else {
                    currentTemplateEntries.push([key, value]);
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
                currentPlayerEntries.push(['WeaponPreference', weaponPreference]);
                const player = new Player({
                    name: currentPlayerName,
                    templates: currentPlayerTemplates,
                    config: Object.fromEntries(currentPlayerEntries)
                }, this);
                players.push(player);
                weaponPreference = [];
                currentPlayerEntries = [];
            } else if (!ignoreNextLine) {
                var [key, value] = this.getEntries(cleanLine);
                if (key === 'WeaponPreference') {
                    weaponPreference.push(value);
                } else {
                    currentPlayerEntries.push([key, value]);
                }
            }
        });
        
        return players;
    }
}