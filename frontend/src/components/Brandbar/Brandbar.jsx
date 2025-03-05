import React from 'react'
import "./Brandbar.css";
import Calvin from "../../assets/calvin-black.png";
import Gucci from "../../assets/gucci-black.png";
import Prada from "../../assets/prada-black.png";
import Versace from "../../assets/versace-black.png";
import Zara from "../../assets/zara-black.png";

const Brandbar = () => {
  return (
    <div className='brand-container'>
        <img src={Calvin} alt="" />
        <img src={Gucci} alt="" />
        <img src={Prada} alt="" />
        <img src={Versace} alt="" />
        <img src={Zara} alt="" />
    </div>
  )
}

export default Brandbar