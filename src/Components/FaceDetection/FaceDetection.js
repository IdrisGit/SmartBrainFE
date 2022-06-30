import React from "react";
import BoundingBoxes from '../BoundingBoxes/BoundingBoxes';
import "./FaceDetection.css"

const FaceDetection = ({imageUrl, boundingData }) => {
    return(
    <div className="center">
        <div className="absolute mt2">
            <img id="inputimage" alt="" src={imageUrl} width="500px" height='auto' />
            <div>{
                boundingData.map((data, i) => {
                return(
                     <BoundingBoxes
                        key = {i}
                        top = {boundingData[i][0].topRow}
                        right = {boundingData[i][0].rightCol}
                        bottom = {boundingData[i][0].bottomRow}
                        left = {boundingData[i][0].leftCol}
                        />
                    )})
                }
            </div>
        </div>     
    </div>
);
};

export default FaceDetection;