import { useState, useRef, useEffect } from "react";

import { Switch } from 'antd';

import HorizontalResizableInput from "../horizontalInput";
import VerticalResizableInput from "../verticalInput";

const localeSwitchCheckedNameMap: {[key: string]: string} = {
    "en" : "Vertical",
    "zh_cn": "纵向"
}

const localeSwitchUnCheckedNameMap: {[key: string]: string} = {
    "en" : "Horizontal",
    "zh_cn": "横向"
}

function ChangeableResizableInput(props: any) {
    const [inputContent, setInputContent] = useState('');

    // horizontal or vertical display
    const [vertical, setVertical] = useState(true);
    const [refHeight, setRefHeight] = useState<number | null>(null);
    const [refWidth, setRefWidth] = useState<number | null>(null);
    
    const ref = useRef<null | HTMLDivElement>(null);
 
    useEffect(() => {
        if (ref.current) {
            setRefHeight(ref.current.offsetHeight);
            setRefWidth(ref.current.offsetWidth);
        }
    }, [props]);

    function onDisplayChange(checked: boolean) {
        setVertical(checked)
    };

    function changeInputContent(content: string){
        setInputContent(content);
        props.callback(content);
    };

    return (
        <>
            <div ref={ref} style={{ width: "100%", height: `calc(100% - 22px)`, overflow: "hidden" }}>
                {vertical && <VerticalResizableInput initialHeight={refHeight} inputContent={inputContent} outputContent={props.outputContent} callback={changeInputContent}/>}
                {!vertical && <HorizontalResizableInput initialHeight={refHeight} initialWidth={refWidth} inputContent={inputContent} outputContent={props.outputContent} callback={changeInputContent}/>}
            </div>
            <div>
                <Switch style={{float: "right"}} checkedChildren={localeSwitchCheckedNameMap[props.locale]} unCheckedChildren={localeSwitchUnCheckedNameMap[props.locale]} defaultChecked onChange={onDisplayChange}/>
            </div>
        </>
        
    );
}

export default ChangeableResizableInput;