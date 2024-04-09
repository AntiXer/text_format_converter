import { useState } from "react";
import { Button, Checkbox } from 'antd';

import ChangeableResizableInput from '../../components/changeableInput';

import { jsonFormat, unicodeEncode } from '../../utils/stringUtil';

import {connect} from 'react-redux';
import { changeLocale } from "../../store/action/changeLocale";

const localeButtonNameMap: {[key: string]: string} = {
    "en": "Verification/Conversion",
    "zh_cn": "校验/转换"
}

const localeCheckboxMap1: {[key: string]: string} = {
    "en": "Line break",
    "zh_cn": "输出换行"
}

const localeCheckboxMap2: {[key: string]: string} = {
    "en": "Chinese to Unicode",
    "zh_cn": "汉字转Unicode"
}

const localeCheckboxMap3: {[key: string]: string} = {
    "en": "Unicode to Chinese",
    "zh_cn": "Unicode转汉字"
}

function JSONParse(props: any) {
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');

    function changeInput(content: string) {
        setInput(content);
    }

    function encode() {
        let inputContent = input;
        if (!unicodeDecodeFlag) {
            inputContent = inputContent.replace(/\\u/g,"\\\\u");
        }

        let result = jsonFormat(inputContent, lineBreakFlag);
        if (!unicodeDecodeFlag) {
            result = result.replace(/\\\\u/g,"\\u");
        }

        if (unicodeEncodeFlag && result !== "格式错误") {
            result = unicodeEncode(result);
        }

        setOutput(result);
    }
    
    const [unicodeEncodeFlag, setUnicodeEncodeFlag] = useState(false);
    function onUnicodeEncodeChange() {
        setUnicodeEncodeFlag(!unicodeEncodeFlag);
        if (!unicodeEncodeFlag) {
            setUnicodeDecodeFlag(false);
        }
    }

    const [unicodeDecodeFlag, setUnicodeDecodeFlag] = useState(false);
    function onUnicodeDecodeChange() {
        setUnicodeDecodeFlag(!unicodeDecodeFlag);
        if (!unicodeDecodeFlag) {
            setUnicodeEncodeFlag(false);
        }
    }

    const [lineBreakFlag, setLineBreakFlag] = useState(true);
    function onLineBreakChange() {
        setLineBreakFlag(!lineBreakFlag);
    }

    const locale = props.localeStore.locale;
    return (
        <div style={{ width: "100%", height: "100%", overflow: "hidden" }}>
            <Button type="primary" onClick={encode} style={{ marginBottom:"4px" }}>{localeButtonNameMap[locale]}</Button>
            <Checkbox style={{float: "right"}} onChange={onLineBreakChange} checked={lineBreakFlag}>{localeCheckboxMap1[locale]}</Checkbox>
            <Checkbox style={{float: "right"}} onChange={onUnicodeEncodeChange} checked={unicodeEncodeFlag}>{localeCheckboxMap2[locale]}</Checkbox>
            <Checkbox style={{float: "right"}} onChange={onUnicodeDecodeChange} checked={unicodeDecodeFlag}>{localeCheckboxMap3[locale]}</Checkbox>
            <div style={{ width: "100%", height: `calc(100% - 36px)`, overflow: "hidden" }}>
                <ChangeableResizableInput outputContent={output} callback={changeInput} locale={locale}/>
            </div>
        </div>
    );
}

const mapStateToProps = (state: any) => state

const mapDispatchToProps = {
    changeLocale,
}

export default connect(mapStateToProps, mapDispatchToProps)(JSONParse);