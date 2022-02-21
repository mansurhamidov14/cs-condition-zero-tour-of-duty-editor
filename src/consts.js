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
    { value: 'scout', label: 'Schmidt Scout' },
    { value: 'xm1014', label: '' },
    { value: 'mac10', label: '' },
    { value: 'aug', label: 'Bullpup' },
    { value: 'ump45', label: '' },
    { value: 'sg550', label: '' },
    { value: 'galil', label: 'Galil' },
    { value: 'famas', label: 'Famas' },
    { value: 'awp', label: 'Magnum Sniper Rifle' },
    { value: 'mp5', label: 'MP5' },
    { value: 'm249', label: 'M249' },
    { value: 'm3', label: '' },
    { value: 'm4a1', label: 'Maverick M4A1 Carbine' },
    { value: 'tmp', label: '' },
    { value: 'sg552', label: '' },
    { value: 'ak47', label: 'AK-47' },
    { value: 'p90', label: 'ESC 90' },
    { value: 'shield', label: 'Tactical Shield' },
    { value: 'weapon', label: '' },
    { value: 'knife', label: '' },
    { value: 'grenade', label: '' },
    { value: 'hegren', label: '' },
    { value: 'pistol', label: 'Pistol' },
    { value: 'SMG', label: '' },
    { value: 'machinegun', label: 'Submachinegun' },
    { value: 'shotgun', label: 'Shotgun' },
    { value: 'rifle', label: '' },
    { value: 'sniper', label: 'Sniper Rifle' },
    { value: 'fn57', label: '' },
    { value: 'elites', label: '' },
];

export const FIELDS = [
    { accessor: 'Skill', label: 'Skill', type: 'slider', props: { min: 0, max: 100, stepSize: 5, labelStepSize: 25 } },
    { accessor: 'Aggression', label: 'Bravery', type: 'slider', props: { min: 0, max: 100, stepSize: 5, labelStepSize: 25 } },
    { accessor: 'Teamwork', label: 'Co-op', type: 'slider', props: { min: 0, max: 100, stepSize: 5, labelStepSize: 25 } },
    { accessor: 'ReactionTime', label: 'Reaction time', type: 'number' },
    { accessor: 'AttackDelay', label: 'Attack delay', type: 'number' },
    { accessor: 'Cost', label: 'Cost', type:  'slider', props: { min: 0, max: 5, stepSize: 1, labelStepSize: 5 } },
    { accessor: 'Difficulty', label: 'Difficulty', type: 'select', options: DIFFICULTIES },
    { accessor: 'VoicePitch', label: 'Voice pitch', type: 'number' },
    { accessor: 'Skin', label: 'Skin', type: 'select', options: SKINS },
]
