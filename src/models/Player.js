import { BOT_PROFILE_STATE_UPDATE_EVENT } from "../consts";
import { uuidv4 } from "../utils";

export class Player {
    /**
     * 
     * @param {Object} details 
     * @param {BotCampaignProfile} botCampaignProfile 
     */
    constructor (details, botCampaignProfile) {
        this.id = uuidv4();
        this.name = details.name;
        this.templates = details.templates;
        this.config = details.config;
        this.botCampaignProfile = botCampaignProfile;
        this.defaults = JSON.parse(JSON.stringify(details));
    }

    /**
     * 
     * @param {string} name 
     */
    setName (name) {
        this.name = name;
        this.updateState();
    }

    /**
     * 
     * @param {string} key Key of Player['config']
     * @param {string} value 
     */
    setConfig (key, value) {
        this.config[key] = value;
        this.updateState();
    }

    /**
     * 
     * @param {string} weapon Weapon's buyname. For example - 'm4a1' for 'Maverick M4A1 Carbine'
     */
    addWeaponPreference (weapon) {
        if (this.hasWeaponPreference()) {
            this.config.WeaponPreference.push(weapon);
        }
        this.config.WeaponPreference = [weapon];
        this.updateState();
    }

    /**
     * 
     * @param {number} weaponIndex Index of edited weapon in WeaponPreference list of the player
     * @param {string} value Weapon's buyname. For example - 'm4a1' for 'Maverick M4A1 Carbine'
     */
    editWeaponPreference (weaponIndex, value) {
        if (this.hasWeaponPreference()) {
            this.config.WeaponPreference[weaponIndex] = value;
            this.updateState();
        } else {
            throw new Error('Player does not have any weapon preference');
        }
    }

    /**
     * 
     * @param {number} weaponIndex Index of edited weapon in WeaponPreference list of the player
     */
    removeWeaponPreference (weaponIndex) {
        if (this.hasWeaponPreference()) {
            this.config.WeaponPreference.splice(weaponIndex, 1);
            this.updateState();
        } else {
            throw new Error('Player does not have any weapon preference');
        }
    }
    
    /**
     * 
     * @param {string} template Template name from templates list
     */
    addTemplate (template) {
        this.templates.push(template);
        this.updateState();
    }

    /**
     * 
     * @param {number} index Index of edited template of the player
     * @param {string} template Template name from templates list
     */
    editTemplate (index, template) {
        this.templates[index] = template;
        this.updateState();
    }

    /**
     * 
     * @param {number} index Index of edited template of the player
     */
    removeTemplate (index) {
        this.templates.splice(index, 1);
        this.updateState();
    }

    /**
     * 
     * @param {string} key Key of Player['config]
     */
    toggleConfigParamInheritance (key) {
        if (this.config[key]) {
            this.config[key] = null;
        } else {
            this.config[key] = this.defaults.config[key] || this.botCampaignProfile.defaultConfig[key];
        }
        this.updateState();
    }

    hasWeaponPreference () {
        return Boolean(this.config.WeaponPreference);
    }

    updateState () {
        window.dispatchEvent(new CustomEvent(BOT_PROFILE_STATE_UPDATE_EVENT));
    }
}