import { BOT_PROFILE_STATE_UPDATE_EVENT } from "../consts";

export class StateUpdater {
    updateState () {
        window.dispatchEvent(new CustomEvent(BOT_PROFILE_STATE_UPDATE_EVENT));
    }
}