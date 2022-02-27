import { uuidv4 } from "../utils";
import type { IMap, IMapConfig, IMapOptions, MapPrimitives, MissionTask } from "./types";

export class GameMap implements IMap {
    id: string;
    public config: IMapConfig;

    constructor (
        private _name: string,
        options: IMapOptions,
        public difficultyMode: IMap['difficultyMode']
    ) {
        this.id = uuidv4() as string;
        this.config = {
            FriendlyFire: options.FriendlyFire,
            threshold: options.threshold,
            minEnemies: options.minEnemies,
            tasks: this.parseMissionTasks(options.tasks),
            bots: options.bots.replaceAll('\t', ' ').split(' ').map(enemy => enemy.trim())
        };
    }

    public set name (name: string) {
        this._name = name;
        this.difficultyMode.careerMode.updateState();
    }

    public get name () {
        return this._name;
    }

    setConfig (key: MapPrimitives, value: number) {
        this.config[key] = value;
    }

    private parseMissionTasks (tasks: string): MissionTask[] {
        const tasksArray = tasks.replaceAll('\t', ' ').split(' ').map(task => task.trim());
        return tasksArray.map(task => {
            const taskParts = task.replaceAll('\'', '').replaceAll('\t', ' ').split(' ').map(task => task.trim());
            const action = taskParts[0];
            const amount = tasks[1] ? Number(taskParts[1]) : undefined;
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
}
