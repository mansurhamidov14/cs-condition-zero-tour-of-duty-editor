export const DIFFICULTIES = [
    { value: null, label: 'Auto (inherit / extend)' },
    { value: 'EASY', label: 'Easy' },
    { value: 'NORMAL', label: 'Normal' },
    { value: 'HARD', label: 'Hard'},
    { value: 'EXPERT', label: 'Expert' }
];

export const SKINS = [
    { value: null, label: 'Auto (inherit / extend)' },
    { value: 1, label: 'Seal' },
    { value: 2, label: 'GSG-9' },
    { value: 3, label: 'SAS' },
    { value: 4, label: 'GIGN' },
    { value: 5, label: 'Spetsnaz' }
]

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
    { value: 'machinegun', label: 'Sub-Machine Gun', isWeaponGroup: true },
    { value: 'tmp', label: 'Schmidt Machine Pistol' },
    { value: 'mac10', label: 'Ingram Mac-10' },
    { value: 'smg', label: 'KM Sub-Machine Gun' },
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
    { value: 'grenade', label: 'HE Grenade' },
    { value: 'hegren', label: 'HE Grenade (text is plural, but behaviour the same)' }
];

export const FIELDS = [
    { accessor: 'Skill', label: 'Skill', type: 'slider', props: { min: 0, max: 100, stepSize: 5, labelStepSize: 25 } },
    { accessor: 'Aggression', label: 'Bravery', type: 'slider', props: { min: 0, max: 100, stepSize: 5, labelStepSize: 25 } },
    { accessor: 'Teamwork', label: 'Co-op', type: 'slider', props: { min: 0, max: 100, stepSize: 5, labelStepSize: 25 } },
    { accessor: 'ReactionTime', label: 'Reaction time', type: 'number' },
    { accessor: 'AttackDelay', label: 'Attack delay', type: 'number' },
    { accessor: 'Cost', label: 'Cost', type: 'slider', props: { min: 0, max: 5, stepSize: 1, labelStepSize: 5 } },
    { accessor: 'Difficulty', label: 'Difficulty', type: 'select', options: DIFFICULTIES },
    { accessor: 'VoicePitch', label: 'Voice pitch', type: 'number' },
    { accessor: 'Skin', label: 'Skin', type: 'select', options: SKINS },
];
