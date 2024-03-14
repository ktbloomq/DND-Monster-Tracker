import { roll } from "./die";
export default class LogRoll {
    constructor(creature,type,dice) {
        this.creature = creature;
        this.type = type;
        this.dice = dice;
        this.result = roll(dice);
    }
}