import { useContext } from "react";
import { BotProfileContext } from "./index";

export function useBotProfile () {
    return useContext(BotProfileContext);
}

export function usePlayers () {
    return useBotProfile().allPlayers || [];
}

export function useTemplates () {
    return useBotProfile().templates || [];
}

export function useDefaultConfig () {
    return useBotProfile().defaultConfig || {};
}