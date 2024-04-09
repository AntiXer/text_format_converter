import { useState, useEffect } from 'react';

import { Switch } from 'antd';

const localeSwitchCheckedNameMap: {[key: string]: string} = {
    "en" : "real time",
    "zh_cn": "实时"
}

const localeSwitchUnCheckedNameMap: {[key: string]: string} = {
    "en" : "stop",
    "zh_cn": "暂停"
}

const localeTimeZoneNameMap: {[key: string]: string} = {
    "en" : "time zone",
    "zh_cn": "时区"
}

const localeTimeNameMap: {[key: string]: string} = {
    "en" : "time",
    "zh_cn": "时间"
}

const localeTimestampNameMap1: {[key: string]: string} = {
    "en" : "timestamp (10 digits)",
    "zh_cn": "时间戳 (10位)"
}

const localeTimestampNameMap2: {[key: string]: string} = {
    "en" : "timestamp (13 digits)",
    "zh_cn": "时间戳 (13位)"
}

const localeCurrentNameMap: {[key: string]: string} = {
    "en" : "Current",
    "zh_cn": "当前"
}

function CurrentTime(props: any) {
    const [currentTime, setCurrentTime] = useState(new Date());

    const [realTime, setRealTime] = useState(true);
    
    useEffect(() => {
        const timer = setInterval(() => {
            if (realTime) {
                setCurrentTime(new Date());
            }
        }, 1000);
    
        return () => clearInterval(timer);
    }, [realTime]);

    function onRealTimeChange(checked: boolean) {
        setRealTime(checked)
    };
    
    const locale = props.locale;
    return (
        <div>
            <Switch style={{float: "right"}} checkedChildren={localeSwitchCheckedNameMap[locale]} unCheckedChildren={localeSwitchUnCheckedNameMap[locale]} defaultChecked onChange={onRealTimeChange}/>
            <p>{localeCurrentNameMap[locale]} {localeTimeZoneNameMap[locale]}: {currentTime.getTimezoneOffset() < 0 && '+'}{-(currentTime.getTimezoneOffset()/60)} {localeTimeZoneNameMap[locale]}</p>
            <p>{localeCurrentNameMap[locale]} {localeTimeNameMap[locale]}: {currentTime.toLocaleString()}</p>
            <p>{localeCurrentNameMap[locale]} {localeTimestampNameMap1[locale]}: {Math.floor(currentTime.getTime()/1000)}</p>
            <p>{localeCurrentNameMap[locale]} {localeTimestampNameMap2[locale]}: {currentTime.getTime()}</p>
        </div>
    );
}
 
export default CurrentTime;