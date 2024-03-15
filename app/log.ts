import { roll } from "./die";
export default class LogRoll {
    creature: string;
    type: string;
    dice: string;
    result: number;
    constructor(creature: string,type: string,dice: string) {
        this.creature = creature;
        this.type = type;
        this.dice = dice;
        this.result = roll(dice);
    }
}