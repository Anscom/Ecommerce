import React from 'react'
import "./Home.css";
import Model from '../../assets/girlsandguysmodel.jpg'
import Brandbar from '../../components/Brandbar/Brandbar';
import FeaturedItems from '../../components/FeaturedItems/FeaturedItems';
import Satisfaction from '../../components/Satisfaction/Satisfaction';

const Home = () => {
  return (
    <div>
    <div className='container'>
      <div className='first-container'>
        <h2>FIND CLOTHES<br />THAT MATCHES<br />YOUR STYLES</h2>
        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Blanditiis provident quidem soluta saepe vitae sunt consequatur maiores. Nam, quos incidunt.</p>
        <button>Shop Now</button>
        <ul>
          <li>
            <h6>200+</h6>
            <p>International Brands</p>
          </li>
          <li>
            <h6>2000+</h6>
            <p>High-Quality Products</p>
          </li>
          <li>
            <h6>30,000+</h6>
            <p>Happy Customers</p>
          </li>
        </ul>
      </div>
      <div className='second-container'>
        <img src={Model} alt='model'/>
      </div>
    </div>
    <Brandbar />
    <FeaturedItems />
    <Satisfaction />
    </div>
  )
}

export default Home