import React from 'react';
import './header.styles.scss';
import { Link } from 'react-router-dom';
import MenuDropdown from '../menu-dropdown/menu-dropdown.component';
import CartDropdown from '../cart-dropdown/cart-dropdown.component';
import { selectCurrency } from '../../redux/product/product.selectors';
import { changeCurrency } from '../../redux/product/product.actions';
import { selectCartVisible } from '../../redux/cart/cart.selectors';
import { toggleCartVisible } from '../../redux/cart/cart.actions';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingBasket } from '@fortawesome/free-solid-svg-icons';

class Header extends React.Component {
  state = {
    menuDropdownVisible: false
  }
  
  cartButtonRef = null;
  menuButtonRef = null;
  
  setCartButtonRef = (node) => {
    this.cartButtonRef = node;
  }
  
  handleCartIconClick = () => {
    const { toggleCartVisible } = this.props;
   
      toggleCartVisible();
  }
  
  toggleMenuDropdownVisible = () => {
    this.setState( prevState => ({
      menuDropdownVisible: !prevState.menuDropdownVisible
    }));
  }

  setHamburgerRef = (node) => {
    this.menuButtonRef = node;
  }

  handleHamburgerClick = () => {   
    this.toggleMenuDropdownVisible();
  }

  handleCurrencyClick = ( currString ) => {
    const { selectedCurrency, changeCurrency } = this.props;

    if (( currString === 'eur' && selectedCurrency === 'usd' ) || ( currString === 'usd' && selectedCurrency === 'eur' )) {
      changeCurrency();
    }
  }

  render() {
    const { cartVisible, selectedCurrency } = this.props;

    return (
      <div className='header-container'>
        <div className='header-content-width'>
          <div className='home-link'>
            <Link to='/'>Yummy Pizza</Link>
          </div>
          <div className='navigation-links'>
            <div className='regular-menu'>
              <Link to='/products'>All Products</Link>
              <Link to='/products/pizzas'>Pizzas</Link>
              <Link to='/products/drinks'>Drinks</Link>
              <Link to='/products/desserts'>Desserts</Link>
            </div>
            <div className='hamburger-menu-button' onClick={this.handleHamburgerClick} ref={this.setHamburgerRef}>
              <div className='hamburger-bar'></div>
              <div className='hamburger-bar'></div>
              <div className='hamburger-bar'></div>
            </div>
            <div className='cart-button' onClick={this.handleCartIconClick} ref={this.setCartButtonRef}>
              <FontAwesomeIcon icon={ faShoppingBasket } />
            </div>
            <div className='currency-select'>
              <div className={ `currency-button ${ selectedCurrency === 'eur' && 'selected-currency'}` } onClick={ () => this.handleCurrencyClick( 'eur' ) }>EUR</div>
              |
              <div className={ `currency-button ${ selectedCurrency === 'usd' && 'selected-currency'}` } onClick={ () => this.handleCurrencyClick( 'usd' ) }>USD</div>
            </div>
          </div>
          {
            cartVisible?
            <CartDropdown cartButtonRef={this.cartButtonRef} />
            :''
          }
          {
            this.state.menuDropdownVisible?
            <MenuDropdown menuButtonRef={ this.menuButtonRef} toggleMenuDropdownVisible={ this.toggleMenuDropdownVisible } />
            :''
          }
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  cartVisible: selectCartVisible( state ),
  selectedCurrency: selectCurrency( state )
});

const mapDispatchToProps = (dispatch) => ({
  toggleCartVisible: () => dispatch( toggleCartVisible() ),
  changeCurrency: () => dispatch( changeCurrency() )
});

export default connect( mapStateToProps, mapDispatchToProps )(Header);