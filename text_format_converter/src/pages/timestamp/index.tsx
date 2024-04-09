import { useState } from "react";
import { DatePicker, Button, Input } from 'antd';

import dayjs from 'dayjs';

import CurrentTime from '../../components/currentTime';
import { isNumeric } from "../../utils/numberUtil";

import {connect} from 'react-redux';
import { changeLocale } from "../../store/action/changeLocale";

const localePlaceholderMap1: {[key: string]: string} = {
    "en": "Please choose time",
    "zh_cn": "选择日期时间"
}

const localePlaceholderMap2: {[key: string]: string} = {
    "en": "Please input ten digit timestamp",
    "zh_cn": "输入10位时间戳"
}

const localePlaceholderMap3: {[key: string]: string} = {
    "en": "Please input thirteen digit timestamp",
    "zh_cn": "输入13位时间戳"
}

const localeButtonNameMap1: {[key: string]: string} = {
    "en": "Time to timestamp",
    "zh_cn": "时间转换为时间戳"
}

const localeButtonNameMap2: {[key: string]: string} = {
    "en": "Timestamp to time",
    "zh_cn": "时间戳转换为时间"
}

const localeOutputPlaceholderMap1: {[key: string]: string} = {
    "en": "Time",
    "zh_cn": "日期时间"
}

const localeOutputPlaceholderMap2: {[key: string]: string} = {
    "en": "Ten digit timestamp",
    "zh_cn": "10位时间戳"
}

function TimestampParse(props: any) {
    const [inputDate, setInputDate] = useState<any>(null);
    const [outputTimestamp, setOutputTimestamp] = useState('');

    const [outputDate1, setOutputDate1] = useState<any>(null);
    const [inputSecondTimestamp, setInputSecondTimestamp] = useState('');
    
    const [outputDate2, setOutputDate2] = useState<any>(null);
    const [inputMillisecondTimestamp, setInputMillisecondTimestamp] = useState('');
    
    function onDatePickerChange(value: any, dateString: any) {
        setInputDate(value);
        console.log(dateString);
    };

    function changeSecondTimeStampInput(e: any) {
        setInputSecondTimestamp(e.target.value);
    }

    function changeMillisecondTimeStampInput(e: any) {
        setInputMillisecondTimestamp(e.target.value);
    }

    function onTimeToSecondTimeStamp() {
        if (inputDate) {
            setOutputTimestamp(dayjs(inputDate).unix().toString());
        } else {
            setOutputTimestamp('');
        }
    };
    
    function onSecondTimeStampToTime() {
        if (isNumeric(inputSecondTimestamp)) {
            setOutputDate1(dayjs(parseInt(inputSecondTimestamp)*1000));
        } else {
            setOutputDate1(null);
        }
    };

    function onMillisecondTimeStampToTime() {
        if (isNumeric(inputMillisecondTimestamp)) {
            setOutputDate2(dayjs(parseInt(inputMillisecondTimestamp)));
        } else {
            setOutputDate2(null);
        }
    };

    const locale = props.localeStore.locale;
    return (
        <div style={{ width: "100%", height: "100%", overflow: "hidden" }}>
            <CurrentTime locale={locale} />
            <div>
                <DatePicker placeholder={localePlaceholderMap1[locale]} showTime value={inputDate} onChange={onDatePickerChange} style={{ width: "206px" }} />
                <Button type="primary" onClick={onTimeToSecondTimeStamp} style={{ marginLeft:"8px", marginBottom:"4px" }}>{localeButtonNameMap1[locale]}</Button>
                <Input placeholder={localeOutputPlaceholderMap2[locale]} value={outputTimestamp} style={{ marginLeft:"8px", width: "206px" }}/>
            </div>
            <div>
                <Input placeholder={localePlaceholderMap2[locale]} onChange={changeSecondTimeStampInput} value={inputSecondTimestamp} style={{ width: "206px" }}/>
                <Button type="primary" onClick={onSecondTimeStampToTime} style={{ marginLeft:"8px", marginBottom:"4px" }}>{localeButtonNameMap2[locale]}</Button>
                <DatePicker placeholder={localeOutputPlaceholderMap1[locale]} value={outputDate1} showTime style={{ marginLeft:"8px", width: "206px" }} />
            </div>
            <div>
                <Input placeholder={localePlaceholderMap3[locale]} onChange={changeMillisecondTimeStampInput} value={inputMillisecondTimestamp} style={{ width: "206px" }}/>
                <Button type="primary" onClick={onMillisecondTimeStampToTime} style={{ marginLeft:"8px", marginBottom:"4px" }}>{localeButtonNameMap2[locale]}</Button>
                <DatePicker placeholder={localeOutputPlaceholderMap1[locale]} value={outputDate2} showTime style={{ marginLeft:"8px", width: "206px" }} />
            </div>
        </div>
    );
}

const mapStateToProps = (state: any) => state

const mapDispatchToProps = {
    changeLocale,
}

export default connect(mapStateToProps, mapDispatchToProps)(TimestampParse);