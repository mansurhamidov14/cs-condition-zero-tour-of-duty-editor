import { useContext , useCallback} from "react";
import { BotProfileContext } from "./index";

export function useBotProfile () {
    return useContext(BotProfileContext);
}

export function usePlayers () {
    const { botProfile: { allPlayers, defaultConfig }, backup: { allPlayers: backupPlayers }, setBotProfile } = useBotProfile();

    const setPlayerName = useCallback((playerIndex, name) => {
        setBotProfile(state => ({
            ...state,
            allPlayers: state.allPlayers.map((player, index) => ({
                ...player,
                name: index === playerIndex ? name : player.name
            }))
        }))
    }, [allPlayers]);

    const setConfig = useCallback((playerIndex, configKey, value) => {
        setBotProfile(state => ({
            ...state,
            allPlayers: state.allPlayers.map((player, index) => ({
                ...player,
                config: {
                    ...player.config,
                    [configKey]: playerIndex === index ? value : player.config[configKey]
                }
            }))
        }))
    }, [allPlayers]);

    const addTemplate = useCallback((playerIndex) => {
        setBotProfile(state => ({
            ...state,
            allPlayers: state.allPlayers.map((player, index) => ({
                ...player,
                templates: playerIndex === index ? [...player.templates, ''] : player.templates
            }))
        }));
    }, [allPlayers]);

    const updateTemplate = useCallback((playerIndex, templateIndex, template) => {
        setBotProfile(state => ({
            ...state,
            allPlayers: state.allPlayers.map((player, index) => ({
                ...player,
                templates: playerIndex === index
                    ? player.templates.map((prevTemplate, prevTemplateIndex)  => prevTemplateIndex === templateIndex ? template : prevTemplate)
                    : player.templates
            }))
        }));
    }, [allPlayers]);

    const removeTemplate = useCallback((playerIndex, templateIndex) => {
        setBotProfile(state => ({
            ...state,
            allPlayers: state.allPlayers.map((player, index) => ({
                ...player,
                templates: playerIndex === index
                    ? [...player.templates.slice(0, templateIndex), ...player.templates.slice(templateIndex + 1)]
                    : player.templates
            }))
        }));
    }, [allPlayers]);

    const addWeaponPreference = useCallback((playerIndex, weapon) => {
        setBotProfile(state => ({
            ...state,
            allPlayers: state.allPlayers.map((player, index) => ({
                ...player,
                config: {
                    ...player.config,
                    WeaponPreference: playerIndex === index ? [...player.config.WeaponPreference, weapon] : player.config.WeaponPreference
                }
            }))
        }));
    }, [allPlayers]);

    const updateWeaponPreference = useCallback((playerIndex, weaponIndex, weapon) => {
        setBotProfile(state => ({
            ...state,
            allPlayers: state.allPlayers.map((player, index) => ({
                ...player,
                config: {
                    ...player.config,
                    WeaponPreference: playerIndex === index
                        ? player.config.WeaponPreference.map((prevWeapon, prevWeaponIndex)  => prevWeaponIndex === weaponIndex ? weapon : prevWeapon)
                        : player.config.WeaponPreference
                }
            }))
        }));
    }, [allPlayers]);

    const removeWeaponPreference = useCallback((playerIndex, weaponIndex) => {
        setBotProfile(state => ({
            ...state,
            allPlayers: state.allPlayers.map((player, index) => ({
                ...player,
                config: {
                    ...player.config,
                    WeaponPreference: playerIndex === index
                        ? [...player.config.WeaponPreference.slice(0, weaponIndex), ...player.config.WeaponPreference.slice(weaponIndex + 1)]
                        : player.config.WeaponPreference
                },
            }))
        }));
    }, [allPlayers]);

    const inheritConfigFromTemplate = useCallback((playerIndex, configKey) => {
        setConfig(playerIndex, configKey, undefined)
    }, [allPlayers]);

    const allowToSetConfigParam = useCallback((playerIndex, configKey) => {
        const initialValue = backupPlayers[playerIndex].config[configKey] || defaultConfig[configKey];
        setConfig(playerIndex, configKey, initialValue);
    });

    return {
        allPlayers,
        setPlayerName,
        setConfig,
        addTemplate,
        updateTemplate,
        removeTemplate,
        addWeaponPreference,
        updateWeaponPreference,
        removeWeaponPreference,
        inheritConfigFromTemplate,
        allowToSetConfigParam
    };
}

export function useTemplates () {
    const { botProfile: { templates } } = useBotProfile();

    return { templates };
}