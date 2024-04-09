import { useState } from "react";
import { Button } from 'antd';

import ChangeableResizableInput from '../../../components/changeableInput';

import { utf8Decode, utf8Encode } from '../../../utils/stringUtil';

import {connect} from 'react-redux';
import { changeLocale } from "../../../store/action/changeLocale";

import '../index.scss'

const localeButtonNameMap1: {[key: string]: string} = {
    "en": "Chinese to UTF8",
    "zh_cn": "汉字转UTF8"
}

const localeButtonNameMap2: {[key: string]: string} = {
    "en": "UTF8 to Chinese",
    "zh_cn": "UTF8转汉字"
}

function UTF8Coding(props: any) {
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');

    function changeInput(content: string) {
        setInput(content);
    }

    function encode() {
        setOutput(utf8Encode(input));
    }

    function decode() {
        setOutput(utf8Decode(input));
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

export default connect(mapStateToProps, mapDispatchToProps)(UTF8Coding);