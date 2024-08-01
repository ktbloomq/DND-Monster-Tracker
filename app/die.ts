export function roll(string = "1d20") {
    let dice: number[] = parse(string);

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
    let dice: number[] = [];
    let modifier = 0;
    let diceCountsRaw = string.match(/((-?\d+)|.)(?=d)/g);
    let diceCounts = diceCountsRaw!.map((i) => {return parseInt(i)? parseInt(i):1});

    let diceValues = string.match(/(?<=d)\d+/g)!.map((i) => {return parseInt(i)});

    let modifiersRaw = string.match(/([+-]|^)\d+\b/g);
    if(modifiersRaw) {
        let modifiers = modifiersRaw!.map((n) => {return parseInt(n)});
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