import { useState } from "react";
import { Select, Input, Checkbox } from 'antd';

import { baseTransform } from "../../utils/numberUtil";

const { Option } = Select;

import {connect} from 'react-redux';
import { changeLocale } from "../../store/action/changeLocale";

const localeAddonBeforeMap1: {[key: string]: string} = {
    "en": "Input",
    "zh_cn": "转换数字"
}

const localeAddonBeforeMap2: {[key: string]: string} = {
    "en": "Output",
    "zh_cn": "转换结果"
}

const localeOptionListMap: {[key: string]: string[]} = {
    "en": ["Binary", "Octal", "Decimal", "Hexadecimal"],
    "zh_cn": ["二进制", "八进制", "十进制", "十六进制"]
}

const localeCheckboxMap: {[key: string]: string} = {
    "en": "Uppercase",
    "zh_cn": "输出大写"
}

function BaseConverter(props: any) {
    const locale = props.localeStore.locale;

    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');
    const [inputBase, setInputBase] = useState(localeOptionListMap[locale][2]);
    const [outputBase, setOutputBase] = useState(localeOptionListMap[locale][2]);

    const [capitalLetterFlag, setCapitalLetterFlag] = useState(false);

    function onInputBaseChange(e: any) {
        setInputBase(e);
        setOutput(capitalLetterFlag ? baseTransform(input, e, outputBase).toUpperCase() : baseTransform(input, e, outputBase));
    }

    function onOutputBaseChange(e: any) {
        setOutputBase(e);
        setOutput(capitalLetterFlag ? baseTransform(input, inputBase, e).toUpperCase() : baseTransform(input, inputBase, e));
    }

    function onInputChange(e: any) {
        setInput(e.target.value);
        setOutput(capitalLetterFlag ? baseTransform(e.target.value, inputBase, outputBase).toUpperCase() : baseTransform(e.target.value, inputBase, outputBase));
    }

    function onCapitalLetterChange() {
        setOutput(capitalLetterFlag ? output.toLowerCase() : output.toUpperCase());
        setCapitalLetterFlag(!capitalLetterFlag);
    }

    function generateSelectComponent(defaultValue: string, optionList: string[], onChange: any) {
        return (
            <Select defaultValue={defaultValue} style={{ width: "100px" }} onChange={onChange}>
                {optionList.map((item) => (
                    <Option key={item} value={item}>{item}</Option>
                ))}
            </Select>
        );
    }

    return (
        <div style={{ width: "100%", height: "100%", overflow: "hidden" }}>
            <Checkbox style={{ float: "right", marginBottom:"4px" }} onChange={onCapitalLetterChange} checked={capitalLetterFlag}>{localeCheckboxMap[locale]}</Checkbox>
            <Input addonBefore={localeAddonBeforeMap1[locale]} addonAfter={generateSelectComponent(inputBase, localeOptionListMap[locale], onInputBaseChange)} onChange={onInputChange} style={{ marginBottom:"4px" }}/>
            <Input addonBefore={localeAddonBeforeMap2[locale]} addonAfter={generateSelectComponent(outputBase, localeOptionListMap[locale], onOutputBaseChange)} value={output} style={{ marginBottom:"4px" }}/>
        </div>
    );
}

const mapStateToProps = (state: any) => state

const mapDispatchToProps = {
    changeLocale,
}

export default connect(mapStateToProps, mapDispatchToProps)(BaseConverter);