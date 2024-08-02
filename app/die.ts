export function roll(string = "1d20") {
    const dice: number[] = parse(string);

    // roll
    let result = dice[0];
    let roll = 0
    for(let i=1; i<dice.length; i++) {
        roll = Math.ceil(Math.random() * dice[i]);
        // console.log("roll", i, roll);
        result += roll;
    }
    // console.log("result", result);
    return result;
}

function parse(string ='1d20') {
    string=string.toLowerCase();
    const dice: number[] = [];
    let modifier = 0;
    const diceCountsRaw = string.match(/((-?\d+)|.)(?=d)/g);
    const diceCounts = diceCountsRaw!.map((i) => {return parseInt(i)? parseInt(i):1});

    const diceValues = string.match(/(?<=d)\d+/g)!.map((i) => {return parseInt(i)});

    const modifiersRaw = string.match(/([+-]|^)\d+\b/g);
    if(modifiersRaw) {
        const modifiers = modifiersRaw!.map((n) => {return parseInt(n)});
        modifier = modifiers.reduce((a, b) => a + b);
    }
    dice.push(modifier);

    for(let i=0; i<diceValues.length; i++) {
        for(let j=0; j<Math.abs(diceCounts[i]); j++) {
            dice.push(diceValues[i]*Math.sign(diceCounts[i]));
        }
    }
    return dice;
}