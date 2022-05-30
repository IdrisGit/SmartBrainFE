import React from "react";
import "./FaceDetection.css"

const FaceDetection = ({imageUrl, box}) => {
    return(
    <div className="center">
        <div className="absolute mt2">
            <img id="inputimage" alt="" src={imageUrl} width="500px" height='auto' />
            <div
             className="bounding-box"
             style={{top:box.topRow, bottom:box.bottomRow, left:box.leftCol, right:box.rightCol}}>

            </div>
        </div>     
    </div>
);
};

export default FaceDetection;