import React from 'react';
import './menu-dropdown.styles.scss';
import { Link } from 'react-router-dom';

class MenuDropdown extends React.Component {
  elementRef = null;
  
  setRef = (node) => {
    this.elementRef = node;
  }
  
  componentDidMount() {
    const { menuButtonRef } = this.props;
    window.addEventListener('mousedown', this.handleClickOutsideMenuDropdown);
    console.log( menuButtonRef);
  }
  
  handleClickOutsideMenuDropdown = (e) => {
    const { menuButtonRef } = this.props;
    if (this.elementRef && !this.elementRef.contains(e.target) && !menuButtonRef.contains(e.target)){
      this.props.toggleMenuDropdownVisible();
    }
  }
  
  componentWillUnmount() {
    window.removeEventListener('mousedown', this.handleClickOutsideMenuDropdown);
  }
  
  render() {
    const { toggleMenuDropdownVisible } = this.props;
    return (
      <div className='menu-dropdown-container' ref={ this.setRef }>
        <div className='menu-dropdown-centering-container'>
          <Link to='/products' className='menu-dropdown-item' onClick={ toggleMenuDropdownVisible }>
            All Products
          </Link>
          <hr />
          <Link to='/products/pizzas' className='menu-dropdown-item' onClick={ toggleMenuDropdownVisible }>
            Pizzas
          </Link>
          <hr />
          <Link to='/products/drinks' className='menu-dropdown-item' onClick={ toggleMenuDropdownVisible }>
            Drinks
          </Link>
          <hr />
          <Link to='/products/desserts' className='menu-dropdown-item' onClick={ toggleMenuDropdownVisible }>
            Desserts
          </Link>
          <hr />
        </div>        
      </div>
    );
  }
}

export default MenuDropdown;