import { WEAPONS } from "../consts";
import { TASK_FIELDS } from "../pages/CareerMode/consts";
import { uuidv4 } from "../utils";
import { IMap, IMapConfig, IMapOptions, MapPrimitives, MissionTask } from "./types";

export class GameMap implements IMap {
    id: string;
    public config: IMapConfig;

    constructor(
        public name: string,
        options: IMapOptions,
        public difficultyMode: IMap['difficultyMode']
    ) {
        this.id = uuidv4() as string;
        this.config = {
            FriendlyFire: options.FriendlyFire || 0,
            threshold: options.threshold,
            minEnemies: options.minEnemies,
            tasks: this.parseMissionTasks(options.tasks),
            bots: options.bots.replaceAll('\t', ' ').split(' ').map(enemy => enemy.trim())
        };
    }

    private parseMissionTasks(tasks: string): MissionTask[] {
        const tasksArray = tasks.split('\'').map(task => task.trim()).filter(Boolean);
        return tasksArray.map(task => {
            const taskParts = task.replaceAll('\'', '').replaceAll('\t', ' ').split(' ').map(task => task.trim());
            const action = taskParts[0];
            const amount = taskParts[1] ? Number(taskParts[1]) : undefined;
            let withWeapon: string | undefined;
            let option: MissionTask['option'];
            if (['killwith', 'headshotwith', 'injurewith'].includes(action)) {
                withWeapon = taskParts[2];
                option = taskParts[3] as any;
            } else {
                option = taskParts[2] as any;
            }
            return { action, withWeapon, amount, option };
        });
    }

    public save(data: IMap) {
        const _data = JSON.parse(JSON.stringify(data));
        this.config = {
            ..._data.config,
            tasks: data.config.tasks.map(task => ({
                action: task.action,
                withWeapon: this.getSavedTaskFieldValue('withWeapon', task),
                amount: this.getSavedTaskFieldValue('amount', task),
                option: this.getSavedTaskFieldValue('option', task)
            }))
        };
        this.name = _data.name;
        this.difficultyMode.careerMode.updateState();
    }

    public parseTaskName(task: MissionTask) {
        const actions = {
            injure: 'You must injure at least {enemies} {option}',
            injurewith: 'You must injure at least {enemies} with {weapon} {option}',
            kill: 'You must kill {enemies} {option}',
            killwith: 'You must kill {enemies} with {weapon} {option}',
            killall: 'Your team must eliminate all enemies at least once',
            killblind: 'You must kill {enemies} {option}',
            headshot: 'You must kill {enemies} with headshot {option}',
            headshotwith: 'You must kill {enemies} with headshot using {weapon} {option}',
            winfast: 'You must win a round in less than {count} seconds {option}',
            plant: 'You must plant the bomb {times} {option}',
            defuse: 'You must defuse the bomb  in {rounds} {option}',
            killdefuser: 'You must kill an enemy defusing the planted bomb {times} {option}',
            rescue: 'You must rescue {hostages} {option}',
            rescueall: 'You must rescue all hostages',
            stoprescue: 'You must kill an enemy escorting hostages back to a Rescue Zone {times} {option}',
            hostagessurvive: 'All hostages must survive in each of {rounds}',
            killvip: 'You must kill the VIP {times} {option}'
        } as any;

        return this.bindTaskParamsToText(actions[task.action], this.getDynamicTaskData(task));
    }

    private getDynamicTaskData = (task: MissionTask): any => {
        const { action, amount, withWeapon, option } = task;
        const options = {
            survive: 'and survive the round',
            inarow: 'without dying',
        } as any;
        const _option = option ? options[option] : undefined;
        const kill = { enemies: amount === 1 ? 'an enemy' : `${amount} enemies`, option: _option };
        const killwith = { enemies: amount === 1 ? 'an enemy' : `${amount} enemies`, weapon: WEAPONS.find(({ value }) => value === withWeapon)?.label, option: _option };
        const times = { times: amount === 1 ?  'once' : `${amount} times`, option: _option };
        const base = { count: amount, option: _option };
        const rounds = { rounds: amount === 1 ? `a round` : `${amount} separate rounds`, option: _option };
        const actions = {
            injure: kill,
            injurewith: killwith,
            kill,
            killwith,
            killblind: { enemies: amount === 1 ? 'a flashbang-blinded enemy' : `${amount} flashbang-blinded enemies`, option: _option},
            headshot: kill,
            headshotwith: killwith, 
            winfast: base,
            plant: times,
            defuse: rounds,
            preventDefuse: rounds,
            killdefuser: times,
            rescue: { hostages: amount === 1 ? 'a hostage' : `${amount} hostages`, option: _option },
            stoprescue: times,
            hostagessurvive: rounds,
            killvip: times,
        } as any;

        return actions[action];
    }

    private bindTaskParamsToText(text: string, params?: object) {
        if (params) {
            return Object.entries(params).reduce((acc, [key, value]) => {
                return acc.replace(`{${key}}`, value || '');
            }, text);
        }
        return text;
    }

    private getSavedTaskFieldValue(accessor: keyof MissionTask, task: MissionTask) {
        const field = TASK_FIELDS.find(({ id }) => id === accessor);
        let disabled = false;
        const value = task[accessor];

        if (field?.disabledIf?.length) {
            field.disabledIf.forEach((disabledField) => {
                if (disabledField.is.includes((task as any)?.[disabledField.field])) {
                    disabled = true;
                }
            });
        } else if (field?.enabledIf?.length) {
            disabled = true;
            field.enabledIf.forEach((enabledField) => {
              if (enabledField.is.includes((task as any)?.[enabledField.field])) {
                disabled = false;
              }
            })
        }

        return disabled || value === "none" ? null : value;
    }
}
