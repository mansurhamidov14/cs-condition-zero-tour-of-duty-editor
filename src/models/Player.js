import { Template } from "./Template";

export class Player extends Template {
    /**
     * 
     * @param {Object} details 
     * @param {BotCampaignProfile} botCampaignProfile 
     */
    constructor (details, botCampaignProfile) {
        super(details, botCampaignProfile);
        this.templates = details.templates;
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
}
