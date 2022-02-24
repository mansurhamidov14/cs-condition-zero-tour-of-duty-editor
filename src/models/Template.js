import { uuidv4 } from "../utils";
import { StateUpdater } from "./StateUpdater";

export class Template extends StateUpdater {
    /**
     * 
     * @param {Object} details 
     * @param {BotCampaignProfile} botCampaignProfile 
     */
     constructor (details, botCampaignProfile, saveDefaults = false, isNew = false) {
        super();
        this.id = uuidv4();
        this.isNew = isNew;
        this.name = details.name;
        this.config = details.config;
        this.botCampaignProfile = botCampaignProfile;
        if (saveDefaults) {
            this.defaults = JSON.parse(JSON.stringify(details));
        }
    }

    applyChanges(data) {
        this.config = data.config;
        this.name = data.name;
        this.isNew = false;
    }
}