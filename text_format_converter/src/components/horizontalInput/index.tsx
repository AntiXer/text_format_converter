import { useState } from "react";

import { Input } from 'antd';

const { TextArea } = Input;

function HorizontalResizableInput(props: any) {
    const minWidth = 150;
    const [leftWidth, setLeftWidth] = useState(props.initialWidth/2);

    const minBoxHeight = props.initialHeight;
    const [boxHeight, setBoxHeight] = useState(minBoxHeight);

    const handleWidthResize = (e: any) => {
        const startX = e.clientX;
        const initialLeftWidth = leftWidth;

        document.onmousemove = (e) => {
            const endX = e.clientX;
            let moveLen = initialLeftWidth + (endX - startX);
            moveLen = Math.max(150, Math.min(moveLen, window.innerWidth - minWidth));
            setLeftWidth(moveLen);
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
            <div id="content" style={{ width: "100%", height: `${boxHeight - 5}px`, overflow: "hidden" }}>
                <TextArea
                    id="content-left"
                    defaultValue={props.inputContent}
                    style={{ color: "white", float: "left", width: `${leftWidth}px`, height: "100%", background: "#002140", resize: "none" }}
                    onChange={onChange}
                />
                <div
                    id="content-resize"
                    style={{ float: "left", width: "5px", height: "100%", cursor: "col-resize" }}
                    onMouseDown={handleWidthResize}>
                </div>
                <TextArea
                    id="content-right"
                    value={props.outputContent}
                    style={{ color: "white", float: "right", width: `calc(100% - ${leftWidth + 5}px)`, height: "100%", background: "#001529", resize: "none" }} 
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

export default HorizontalResizableInput;