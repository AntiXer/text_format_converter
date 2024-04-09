import { useState } from "react";
import { Button } from 'antd';

import ChangeableResizableInput from '../../../components/changeableInput';

import { base64Encode, base64Decode } from '../../../utils/stringUtil';

import {connect} from 'react-redux';
import { changeLocale } from "../../../store/action/changeLocale";

import '../index.scss'

const localeButtonNameMap1: {[key: string]: string} = {
    "en": "Chinese to Base64",
    "zh_cn": "汉字转Base64"
}

const localeButtonNameMap2: {[key: string]: string} = {
    "en": "Base64 to Chinese",
    "zh_cn": "Base64转汉字"
}

function Base64Coding(props: any) {
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');

    function changeInput(content: string) {
        setInput(content);
    }

    function encode() {
        setOutput(base64Encode(input));
    }

    function decode() {
        setOutput(base64Decode(input));
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

export default connect(mapStateToProps, mapDispatchToProps)(Base64Coding);