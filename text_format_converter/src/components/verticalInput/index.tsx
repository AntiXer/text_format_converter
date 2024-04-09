import { useState } from "react";

import { Input } from 'antd';

const { TextArea } = Input;

function VerticalResizableInput(props: any) {
    const initialHeight = props.initialHeight;

    const minBoxHeight = initialHeight ? initialHeight : 0;
    const [boxHeight, setBoxHeight] = useState(minBoxHeight);

    const minHeight = 150;
    const [upHeight, setUpHeight] = useState(initialHeight ? minBoxHeight/2 : 150);

    const handleHeightResize = (e: any) => {
        const startY = e.clientY;
        const initialUpHeight = upHeight;

        document.onmousemove = (e) => {
            const endY = e.clientY;
            let moveLen = initialUpHeight + (endY - startY);
            moveLen = Math.max(minHeight, Math.min(moveLen, window.innerWidth - minHeight));
            setUpHeight(moveLen);
        };

        document.onmouseup = () => {
            document.onmousemove = null;
            document.onmouseup = null;
        };
    };

    const handleBoxHeightResize = (e: any) => {
        const startY = e.clientY;
        const initialUpHeight = boxHeight;

        document.onmousemove = (e) => {
            const endY = e.clientY;
            let moveLen = initialUpHeight + (endY - startY);
            moveLen = Math.max(minBoxHeight, Math.min(moveLen, window.innerWidth - minBoxHeight));
            setBoxHeight(moveLen);
        };

        document.onmouseup = () => {
            document.onmousemove = null;
            document.onmouseup = null;
        };
    };

    function onChange(e: any) {
        props.callback(e.target.value);
    }

    return (
        <div id="box" style={{ width: "100%", height: "100%" }}>
            <div id="content" style={boxHeight > 0 ? { width: "100%", height: `${boxHeight - 5}px`, overflow: "hidden" } : { width: "100%", height: `calc(100% - 5px)`, overflow: "hidden" }}>
                <TextArea
                    id="content-up"
                    defaultValue={props.inputContent}
                    style={{ color: "white", float: "left", width: "100%", height: `${upHeight}px`, background: "#002140", resize: "none" }}
                    onChange={onChange}
                />
                <div
                    id="content-resize"
                    style={{ float: "left", width: "100%", height: "5px", cursor: "row-resize" }}
                    onMouseDown={handleHeightResize}>
                </div>
                <TextArea
                    id="content-down"
                    value={props.outputContent}
                    style={{ color: "white", float: "right", width: "100%", height: `calc(100% - ${upHeight + 5}px)`, background: "#001529", resize: "none" }} 
                />
            </div>
            <div
                id="resize"
                style={{ float: "left", width: "100%", height: "5px", cursor: "row-resize" }}
                onMouseDown={handleBoxHeightResize}>
            </div>
        </div>
    );
};

export default VerticalResizableInput;