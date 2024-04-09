function binaryToDecimalNum(str: string): number {
    return parseInt(str, 2);
}

function octalToDecimalNum(str: string): number {
    return parseInt(str, 8);
}

function hexadecimalToDecimalNum(str: string): number {
    return parseInt(str, 16);
}

function decimalNumToBinary(num: number): string {
    return num.toString(2);
}

function decimalNumToOctal(num: number): string {
    return num.toString(8);
}

function decimalNumToHexadecimal(num: number): string {
    return num.toString(16);
}

function isNumeric(input: string): boolean {
    const num = parseInt(input);
    return !isNaN(num);
}

const baseNameMap: {[key: string]: string} = {
    "二进制" : "Binary",
    "八进制": "Octal",
    "十进制": "Decimal",
    "十六进制": "Hexadecimal"
}

function baseTransform(input: string, inputBase: string, outputBase: string): string {
    if (!Object.values(baseNameMap).includes(inputBase)) {
        if(Object.keys(baseNameMap).includes(inputBase)) {
            inputBase = baseNameMap[inputBase];
        } else {
            return "ERROR";
        }
    }

    if (!Object.values(baseNameMap).includes(outputBase)) {
        if(Object.keys(baseNameMap).includes(outputBase)) {
            outputBase = baseNameMap[outputBase];
        } else {
            return "ERROR";
        }
    }

    let decimalNum: number | null = null;
    let revertInput: string | null = null;
    if (inputBase === 'Binary') {
        decimalNum = binaryToDecimalNum(input);
    } else if (inputBase === 'Octal') {
        decimalNum = octalToDecimalNum(input);
    } else if (inputBase === 'Hexadecimal') {
        decimalNum = hexadecimalToDecimalNum(input);
    } else if (inputBase === 'Decimal') {
        if(isNumeric(input)) {
            decimalNum = parseInt(input);
        }
    }

    if (decimalNum === null) {
        return "ERROR";
    }

    if (inputBase === 'Binary') {
        revertInput = decimalNumToBinary(decimalNum);
    } else if (inputBase === 'Octal') {
        revertInput = decimalNumToOctal(decimalNum);
    } else if (inputBase === 'Hexadecimal') {
        revertInput = decimalNumToHexadecimal(decimalNum);
    } else if (inputBase === 'Decimal') {
        revertInput = decimalNum.toString();
    }

    if (input !== revertInput) {
        return "ERROR";
    }

    if (outputBase === 'Binary') {
        return decimalNumToBinary(decimalNum);
    } else if (outputBase === 'Octal') {
        return decimalNumToOctal(decimalNum);
    } else if (outputBase === 'Hexadecimal') {
        return decimalNumToHexadecimal(decimalNum);
    } else if (outputBase === 'Decimal') {
        return decimalNum.toString();
    }

    return "";
}

export {baseTransform, isNumeric, baseNameMap};