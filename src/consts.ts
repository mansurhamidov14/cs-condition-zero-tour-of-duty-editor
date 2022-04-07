import { IConfigOptions } from "./models/types";

export const IS_DEV = process.env.NODE_ENV === 'development';

type Field = |
    {
        type: 'slider';
        accessor: keyof IConfigOptions;
        label: string;
        props: any;
    } |
    {
        type: 'number';
        accessor: keyof IConfigOptions;
        label: string;
        props: any;
    } |
    {
        type: 'select';
        accessor: keyof IConfigOptions;
        label: string;
        options: any[];
        skipForTemplate?: boolean;
    }

export const DIFFICULTIES = ['EASY', 'NORMAL', 'HARD', 'EXPERT'];

export const SKINS = [
    { value: 0, label: 'Unset' },
    { value: 1, label: 'Seal / Phoenix Connexion' },
    { value: 2, label: 'GSG-9 / Elite Crew' },
    { value: 3, label: 'SAS / Guerilla Warfare' },
    { value: 4, label: 'GIGN / Arctic Avengers' },
    { value: 5, label: 'Spetsnaz / Midwest Milita' }
];

export const REQUIRED_SKINS = SKINS.filter(skin => skin.value);

export const WEAPONS = [
    { value: 'pistol', label: 'Pistol', isWeaponGroup: true },
    { value: 'glock', label: '9x19mm Sidearm' },
    { value: 'usp', label: 'KM .45 Tactical' },
    { value: 'p228', label: '228 Compact' },
    { value: 'deagle', label: 'Night Hawk .50c' },
    { value: 'fn57', label: 'ES Five-Seven' },
    { value: 'elites', label: '.40 Dual Elites' },
    { value: 'shotgun', label: 'Shotgun', isWeaponGroup: true },
    { value: 'm3', label: 'Leone 12 Gauge Super' },
    { value: 'xm1014', label: 'Leone YG1265 Auto Shotgun' },
    { value: 'SMG', label: 'Sub-Machine Gun', isWeaponGroup: true },
    { value: 'tmp', label: 'Schmidt Machine Pistol' },
    { value: 'mac10', label: 'Ingram Mac-10' },
    { value: 'mp5', label: 'KM Sub-Machine Gun' },
    { value: 'ump45', label: 'KM UMP45' },
    { value: 'p90', label: 'ES C90' },
    { value: 'rifle', label: 'Rifle', isWeaponGroup: true },
    { value: 'galil', label: 'IDF Defender' },
    { value: 'famas', label: 'Clarion 5.56' },
    { value: 'ak47', label: 'CV-47' },
    { value: 'm4a1', label: 'Maverick M4A1 Carbine' },
    { value: 'sg552', label: 'Krieg 552' },
    { value: 'aug', label: 'Bullpup' },
    { value: 'sniper', label: 'Sniper Rifle', isWeaponGroup: true },
    { value: 'scout', label: 'Schmidt Scout' },
    { value: 'sg550', label: 'Krieg 550 Commando' },
    { value: 'awp', label: 'Magnum Sniper Rifle' },
    { value: 'g3sg1', label: 'D3/AU-1' },
    { value: 'm249', label: 'M249' },
    { value: 'knife', label: 'Knife' },
    { value: 'shield', label: 'Tactical Shield' },
    { value: 'grenade', label: 'HE Grenade' },
    { value: 'hegren', label: 'HE Grenade (text is plural, but behaviour the same)' }
];

export const FIELDS: Field[] = [
    { accessor: 'Skill', label: 'Skill', type: 'slider', props: { min: 0, max: 100, stepSize: 5, labelStepSize: 100 } },
    { accessor: 'Aggression', label: 'Bravery', type: 'slider', props: { min: 0, max: 100, stepSize: 5, labelStepSize: 100 } },
    { accessor: 'Teamwork', label: 'Co-op', type: 'slider', props: { min: 0, max: 100, stepSize: 5, labelStepSize: 100 } },
    { accessor: 'Cost', label: 'Cost', type: 'slider', props: { min: 0, max: 5, stepSize: 1, labelStepSize: 5 } },
    { accessor: 'ReactionTime', label: 'Reaction time', type: 'number', props: { stepSize: 0.01, max: 1, min: 0, minorStepSize: 0.01 } },
    { accessor: 'AttackDelay', label: 'Attack delay', type: 'number', props: { stepSize: 0.01, max: 1, min: 0, minorStepSize: 0.01 } },
    { accessor: 'VoicePitch', label: 'Voice pitch', type: 'number', props: { min: 0 } },
    { accessor: 'Skin', skipForTemplate: true, label: 'Skin', type: 'select', options: SKINS },
];

export const WEAPONS_WITHOUT_GROUPS = WEAPONS.filter(({ isWeaponGroup }) => !isWeaponGroup);

// events
export const BOT_PROFILE_INIT_EVENT = 'botProfileInitialized';
export const BOT_PROFILE_STATE_UPDATE_EVENT = 'botProfileStateUpdate';
export const BOT_PROFILE_UNMOUNT = 'botProfileUnmount';
export const CONFIRMATION_REQUEST_EVENT = 'confirmationRequested';
export const CAREER_MODE_STATE_UPDATE_EVENT = 'careerModeStateUpdate';
export const CAREER_MODE_UNMOUNT = 'careerModeUnmount';
export const PLAYER_DELETED_EVENT = 'playerDeleted';
export const PLAYER_EDITED_EVENT = 'playerEdited';
export const PLAYER_CREATED_EVENT = 'playerCreated';