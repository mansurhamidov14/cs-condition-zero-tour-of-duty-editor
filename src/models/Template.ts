import { uuidv4 } from "../utils";
import type { ITemplate, ITemplateOptions } from "./types";

export class Template implements ITemplate {
    public id: string;
    public isNew: boolean;
    public name: string;
    public config: ITemplate['config'];
    public botProfile: ITemplate['botProfile'];
    public defaults?: ITemplate['defaults'];

     constructor (options: ITemplateOptions, botProfile: ITemplate['botProfile'], saveDefaults = false, isNew = false) {
        this.id = uuidv4() as string;
        this.isNew = isNew;
        this.name = options.name;
        this.config = options.config;
        this.botProfile = botProfile;
        if (saveDefaults) {
            this.defaults = JSON.parse(JSON.stringify(options));
        }
    }

    save(data: ITemplate) {
        this.config = data.config;
        this.botProfile.allPlayers.forEach((player) => {
            player.templates = player.templates.map(template => template === this.name ? data.name : template);
        });
        this.name = data.name;
        this.isNew = false;
        this.botProfile.updateState();
    }
}