import { DifficultyModePrimitives, MapPrimitives } from "../../models/types";

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
