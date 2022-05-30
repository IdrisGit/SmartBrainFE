import React from "react";
import Tilt from 'react-parallax-tilt';
import logo from './logo.png'
import './Logo.css'

const Logo = () => {
    return(
        <div className="ma4 mt0">
            <Tilt className="Tilt br-2 shadow-5" style ={{height: 120, width:120}}>
                <div className="Tilt-inner" >
                    <img style={{paddingTop : '25px'}} alt = "Logo" src= {logo}  /> 
                </div>
            </Tilt>
        </div>
    );
};

export default Logo;