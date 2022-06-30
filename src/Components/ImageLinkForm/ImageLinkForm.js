import React from "react";
import './ImageLinkForm.css';

const ImageLinkForm = ({onInputChange, onButtonSubmit}) => {
    return(
        <div>
            <p className="f3">
                {"This Magic Brain Will Detect Faces In Your Images. Give It A Try!!!"}
            </p>
            <div className="center">
                <div className="center form pa3 br3 shadow-2">
                    <input className=" center f4 pa2 w-70" type='text' label='Enter Image URL' onChange={onInputChange} />
                    <button 
                        className="f4 pv2 w-30 link grow dib white bg-light-green"
                        onClick={onButtonSubmit}>
                        Detect
                    </button>
                </div>
               
            </div>
        </div>
    );
}

export default ImageLinkForm;