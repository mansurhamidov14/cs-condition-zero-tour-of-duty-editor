import { useContext } from "react";
import { BotProfileContext } from "./index";

export function useBotProfile () {
    return useContext(BotProfileContext);
}
