import { useState } from "react";
import { Button } from 'antd';

import ChangeableResizableInput from '../../../components/changeableInput';

import { unicodeEncode, unicodeDecode } from '../../../utils/stringUtil';

import {connect} from 'react-redux';
import { changeLocale } from "../../../store/action/changeLocale";

import '../index.scss'

const localeButtonNameMap1: {[key: string]: string} = {
    "en": "Chinese to Base64",
    "zh_cn": "汉字转Unicode"
}

const localeButtonNameMap2: {[key: string]: string} = {
    "en": "Unicode to Chinese",
    "zh_cn": "Unicode转汉字"
}

function UnicodeCoding(props: any) {
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');

    function changeInput(content: string) {
        setInput(content);
    }

    function encode() {
        setOutput(unicodeEncode(input));
    }

    function decode() {
        setOutput(unicodeDecode(input));
    }

    const locale = props.localeStore.locale;
    return (
        <div className="encoding">
            <Button type="primary" onClick={encode}>{localeButtonNameMap1[locale]}</Button>
            <Button className="button" type="primary" onClick={decode}>{localeButtonNameMap2[locale]}</Button>
            <div className="input">
                <ChangeableResizableInput outputContent={output} callback={changeInput} locale={locale}/>
            </div>
        </div>
    );
}

const mapStateToProps = (state: any) => state

const mapDispatchToProps = {
    changeLocale,
}

export default connect(mapStateToProps, mapDispatchToProps)(UnicodeCoding);