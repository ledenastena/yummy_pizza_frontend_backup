import React from 'react';
import './home.styles.scss';
import { Link } from 'react-router-dom';

class HomePage extends React.Component {

  render() {

    return (
      <div className='homepage-container'>
        <Link to='/products'>
          <img src={ `src/assets/pizza_bg.png` } className='home-image' alt='pizza-background' />
        </Link>
      </div>
    );
  }
}



export default HomePage;