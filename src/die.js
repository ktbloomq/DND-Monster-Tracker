export function roll(string = "1d20") {
    // parse string
    // console.log("string", string);
    let dPos = 0;
    let modPos = string.length;
    let count = 0;
    let diceType = 0;
    let mod = 0;
    for(let i=0; i<string.length; i++) {
        // console.log(string[i]);
        if(string[i]==='d') {
            dPos = i;
        } else if(string[i]==='+' || string[i]==='-') {
            modPos = i;
        }
    }
    count = Number(string.slice(0,dPos));
    diceType = Number(string.slice(dPos+1,modPos));
    mod = Number(string.slice(modPos));
    mod = mod ? mod : 0;
    // console.log("count",count);
    // console.log("d", diceType);
    // console.log("mod", mod);

    // roll
    let result = 0;
    let roll = 0
    for(let i=0; i< count; i++) {
        roll = Math.ceil(Math.random() * diceType);
        // console.log("roll", i, roll);
        result += roll;
    }
    result += mod;
    // console.log("result", result);
    return result;
}