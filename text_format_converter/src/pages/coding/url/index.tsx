import { useState } from "react";
import { Button } from 'antd';

import ChangeableResizableInput from '../../../components/changeableInput';

import { urlEncode, urlDecode } from '../../../utils/stringUtil';

import {connect} from 'react-redux';
import { changeLocale } from "../../../store/action/changeLocale";

import '../index.scss'

const localeButtonNameMap1: {[key: string]: string} = {
    "en": "Chinese to Url",
    "zh_cn": "汉字转Url"
}

const localeButtonNameMap2: {[key: string]: string} = {
    "en": "Url to Chinese",
    "zh_cn": "Url转汉字"
}

function UrlCoding(props: any) {
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');

    function changeInput(content: string) {
        setInput(content);
    }

    function encode() {
        setOutput(urlEncode(input));
    }

    function decode() {
        setOutput(urlDecode(input));
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

export default connect(mapStateToProps, mapDispatchToProps)(UrlCoding);