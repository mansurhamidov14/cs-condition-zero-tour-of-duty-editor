import { Template } from "./Template";

export class Player extends Template {
    /**
     * 
     * @param {Object} details 
     * @param {BotCampaignProfile} botCampaignProfile 
     */
    constructor (details, botCampaignProfile, saveDefaults = false, isNew = false) {
        super(details, botCampaignProfile, saveDefaults, isNew);
        this.templates = details.templates;
    }

    applyChanges(data) {
        super.applyChanges(data);
        this.templates = data.templates;
    }
}
