import { uuidv4 } from "../utils";
import { StateUpdater } from "./StateUpdater";

export class Template extends StateUpdater {
    /**
     * 
     * @param {Object} details 
     * @param {BotCampaignProfile} botCampaignProfile 
     */
     constructor (details, botCampaignProfile) {
        super();
        this.id = uuidv4();
        this.name = details.name;
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
        } else {
            this.config.WeaponPreference = [weapon];
        }
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
}