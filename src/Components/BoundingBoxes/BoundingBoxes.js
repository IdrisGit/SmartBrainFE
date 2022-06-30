import React from 'react';
import './BoundingBoxes.css';

const BoundingBoxes= (data) =>{


    return(
        <div className='bounding-box' style={{top: data.top, right: data.right, bottom: data.bottom, left: data.left}}>
        </div>
    )
};

export default BoundingBoxes;