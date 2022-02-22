import { StateUpdater } from "./StateUpdater";

export class Config extends StateUpdater {
    /**
     * 
     * @param {Object} details 
     * @param {BotCampaignProfile} botCampaignProfile 
     */
    constructor(config) {
        super();
        Object.assign(this, config);
    }

    set(key, value) {
        this[key] = value;
        this.updateState();
    }

    /**
     * 
     * @param {string} weapon Weapon's buyname. For example - 'm4a1' for 'Maverick M4A1 Carbine'
     */
    addWeaponPreference(weapon) {
        if (this.hasWeaponPreference()) {
            this.WeaponPreference.push(weapon);
        } else {
            this.WeaponPreference = [weapon];
        }
        this.updateState();
    }

    /**
     * 
     * @param {number} weaponIndex Index of edited weapon in WeaponPreference list of the player
     * @param {string} value Weapon's buyname. For example - 'm4a1' for 'Maverick M4A1 Carbine'
     */
    editWeaponPreference(weaponIndex, value) {
        if (this.hasWeaponPreference()) {
            this.WeaponPreference[weaponIndex] = value;
            this.updateState();
        } else {
            throw new Error('Player does not have any weapon preference');
        }
    }

    /**
     * 
     * @param {number} weaponIndex Index of edited weapon in WeaponPreference list of the player
     */
    removeWeaponPreference(weaponIndex) {
        if (this.hasWeaponPreference()) {
            this.WeaponPreference.splice(weaponIndex, 1);
            this.updateState();
        } else {
            throw new Error('Player does not have any weapon preference');
        }
    }

    hasWeaponPreference() {
        return Boolean(this.WeaponPreference?.length);
    }
}