import { WEAPONS } from "../../consts";
import { DifficultyModePrimitives, MapPrimitives, MissionTask } from "../../models/types";

type DifficultyModePrimitiveFieldProps = {
    accessor: DifficultyModePrimitives;
    label: string;
    helperText?: string;
}

type MapPrimitiveFieldProps = {
    accessor: MapPrimitives,
    label: string;
    helperText?: string;
    inputType: 'switch' | 'number';
}

export const difficultyModePrimitiveFields: DifficultyModePrimitiveFieldProps[] = [
    { accessor: 'InitialPoints', label: 'Initial Reputation Points'},
    { accessor: 'MatchWins', label: 'Match wins', helperText: 'Minimum amount of won rounds to complete mission after having all tasks done'},
    { accessor: 'MatchWinBy', label: 'Match win by', helperText: 'Minimum score difference to complete mission after having all tasks done'}
];

export const mapPrimitiveFields: MapPrimitiveFieldProps[] = [
    { accessor: 'minEnemies', label: 'Minimum enemies count', inputType: 'number' },
    {
        accessor: 'threshold',
        label: 'Threshold',
        inputType: 'number',
        helperText: `
            Defines the Reputation Point (RP) value above which one enemy is added for every additional RP until we run out of bots on the 'Bots' list.
            Example: Let's assume 'threshold' is 15 and 'minEnemies' for the specific map is 3. We added 5 enemy bots for the map. If we have RP = 15, we will face enemies in the amount indicated in the field 'Minimum enemies count', i.e 3. For each additional RP the enemies count will increase by one, until 'Bots' list ends
        `
    },
    { accessor: 'FriendlyFire', label: 'Friendly fire', inputType: 'switch' }
];

type FieldAvailability = {
    field: keyof MissionTask;
    is: string[];
}

type TaskFieldBase = {
    id: keyof MissionTask;
    disabledIf?: FieldAvailability[];
    enabledIf?: FieldAvailability[];
    col: number
}

interface TaskFieldNumeric extends TaskFieldBase {
    type: 'number';
    props: any;
}

interface TaskFieldSelect extends TaskFieldBase {
    type: 'select';
    options: { value: string, label: string, disabledIf?: FieldAvailability[] }[];
}

type TaskFields = (TaskFieldNumeric | TaskFieldSelect)[]

export const TASK_FIELDS: TaskFields = [
    {
        id: 'action',
        options: [
            { value: 'injure', label: 'Injure' },
            { value: 'injurewith', label: 'Injure with weapon' },
            { value: 'kill', label: 'Kill' },
            { value: 'killwith', label: 'Kill with weapon' },
            { value: 'killall', label: 'All enemies to be eliminated' },
            { value: 'killblind', label: 'Kill flashbang-blinded' },
            { value: 'headshot', label: 'Kill with headshot' },
            { value: 'headshotwith', label: 'Kill with headshot using weapon' },
            { value: 'winfast', label: 'Win a round in less than (seconds)' },
            { value: 'plant', label: 'Plant a bomb' },
            { value: 'defuse', label: 'Defuse the bomb' },
            { value: 'killdefuser', label: 'Kill bomb defuser' },
            { value: 'rescue', label: 'Rescue hostages (count)' },
            { value: 'rescueall', label: 'Rescue all hostages' },
            { value: 'stoprescue', label: 'Kill enemy escorting a hostage' },
            { value: 'hostagessurvive', label: 'All hostages to be survived' },
            { value: 'killvip', label: 'Kill VIP' }
        ],
        disabledIf: [],
        type: 'select',
        col: 4,
    },
    {
        id: 'amount',
        type: 'number',
        props: { min: 1 },
        disabledIf: [{ field: 'action', is: ['killall', 'rescueall'] }],
        col: 2
    },
    {
        id: 'withWeapon',
        type: 'select',
        options: WEAPONS,
        enabledIf: [{ field: 'action', is: ['injurewith', 'killwith', 'headshotwith']}],
        col: 3,
    },
    {
        id: 'option',
        type: 'select',
        options: [
            { value: 'none', label: 'None' },
            { value: 'survive', label: 'Survive round' },
            { value: 'inarow', label: 'without dying', disabledIf: [{ field: 'action', is: ['winfast']}] }
        ],
        disabledIf: [{ field: 'action', is: ['killall', 'rescueall', 'hostagessurvive'] }],
        col: 3
    }
]
