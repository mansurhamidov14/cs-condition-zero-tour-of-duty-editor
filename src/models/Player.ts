import { Template } from "./Template";
import type { IPlayer, IPlayerOptions, ITemplate } from "./types";

export class Player extends Template implements IPlayer {
    public templates: IPlayer['templates'];
    public defaults?: IPlayer['defaults'];

    constructor (options: IPlayerOptions, botProfile: IPlayer['botProfile'], saveDefaults = false, isNew = false) {
        super(options, botProfile, saveDefaults, isNew);
        this.templates = options.templates;
    }

    save(data: IPlayer | ITemplate) {
        this.config = data.config;
        this.name = data.name;
        this.isNew = false;
        this.templates = (data as any).templates;
        this.botProfile.updateState();
    }
}
