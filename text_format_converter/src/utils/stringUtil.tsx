function assemblePath(pathList: string[], reverse: boolean): string {
    if (reverse) {
        let reversePathList = [...pathList].slice().reverse();
        return '/' + reversePathList.join('/');
    }
    return '/' + pathList.join('/');
}

function utf8Encode(str: string): string {
    const utf8Encoder = new TextEncoder();
    const utf8Array = utf8Encoder.encode(str);

    let binaryStr = '';
    for (let i = 0; i < utf8Array.length; i++) {
        binaryStr += String.fromCharCode(utf8Array[i]);
    }

    return binaryStr;
}

function utf8Decode(utf8Str: string): string {
    const utf8Decoder = new TextDecoder();
    let charCodeArray = [];
    for (let i = 0; i < utf8Str.length; i++) {
        charCodeArray.push(utf8Str.charCodeAt(i));
    }
    const utf8Array = new Uint8Array(charCodeArray);
    return utf8Decoder.decode(utf8Array);
}

function base64Encode(str: string): string {
    let utf8Str = utf8Encode(str);
    let base64Str = btoa(utf8Str);
    return base64Str;
}

function base64Decode(base64Str: string): string {
    let str = atob(base64Str);
    let utf8Str = utf8Decode(str);
    return utf8Str;
}

function unicodeEncode(chinese: string): string {
    return chinese.split('').map(char => {
        const code = char.charCodeAt(0);
        return code > 255 ? '\\u' + char.charCodeAt(0).toString(16).toUpperCase() : char;
    }).join('');
}
 
function unicodeDecode(unicodeStr: string): string {
    return unicodeStr.replace(/\\u[\dA-F]{4}/gi, match => {
        const code = parseInt(match.slice(2), 16);
        return String.fromCharCode(code);
    });
}

function urlEncode(url: string): string {
    return encodeURIComponent(url);
}
 
function urlDecode(url: string): string {
    return decodeURIComponent(url);
}

function jsonFormat(str: string, lineBreak: boolean): string {
    if (!isJsonString(str)) {
        return "ERROR";
    }

    return jsonObjectFormat(JSON.parse(str), 0, 4, lineBreak);
}

function jsonObjectFormat(object: any, level: number, interval: number, lineBreak: boolean): string {
    let startCharacter = "";
    let endCharacter = "";
    let content = "";

    if (!lineBreak) {
        interval = 0;
    }

    if (object === undefined) {
        return "undefined";
    } else if (object === null) {
        return "null";
    } else if (object instanceof Array) {
        startCharacter = lineBreak ? "[\n" : "[";
        endCharacter = multiplyString(" ", level * interval) + "]";
        for (let i = 0; i < object.length; i++) {
            content += multiplyString(" ", (level + 1) * interval) + jsonObjectFormat(object[i], level + 1, interval, lineBreak);
            if (i === object.length - 1) {
                content += lineBreak ? "\n" : "";
            } else {
                content += lineBreak ? ",\n" : ",";
            }
        }
    } else if (typeof(object) === "number") {
        content = "" + object;
    } else if (typeof(object) === "string") {
        content = JSON.stringify(object);
    } else if (typeof(object) === "boolean") {
        return object ? "true" : "false";
    } else {
        startCharacter = lineBreak ? "{\n" : "{";
        endCharacter = multiplyString(" ", level * interval) + "}";
        
        let keyList = Object.keys(object);
        for (let i = 0; i < keyList.length; i++) {
            const key = keyList[i];
            content += multiplyString(" ", (level + 1) * interval) + '"' + key + '"' + " : " +jsonObjectFormat(object[key], level + 1, interval, lineBreak);
            if (i === keyList.length - 1) {
                content += lineBreak ? "\n" : "";
            } else {
                content += lineBreak ? ",\n" : ",";
            }
        }
    }

    return startCharacter + content + endCharacter;
}

function isJsonString(str: string): boolean {
    const original = str.trim();
    if ((original.startsWith("{") && original.endsWith("}") || (original.startsWith("[") && original.endsWith("]")))) {
        try {
            JSON.parse(str);
            return true;
        } catch (e) {
            return false;
        }
    }

    return false;
}

function multiplyString(str: string, times: number): string {
    let result = '';
    for (let i = 0; i < times; i++) {
        result += str;
    }
    return result;
}

export { assemblePath, utf8Encode, utf8Decode, base64Encode, base64Decode, unicodeEncode, unicodeDecode, urlEncode, urlDecode, jsonFormat };