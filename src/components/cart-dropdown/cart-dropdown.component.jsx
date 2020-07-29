import React from 'react';
import './cart-dropdown.styles.scss';
import { selectCartItems } from '../../redux/cart/cart.selectors';
import { selectCurrency } from '../../redux/product/product.selectors';
import { toggleCartVisible } from '../../redux/cart/cart.actions';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class CartDropdown extends React.Component {
  elementRef = null;
  
  setRef = (node) => {
    this.elementRef = node;
  }
  
  componentDidMount() {
    window.addEventListener('mousedown', this.handleClickOutsideCart);
  }
  
  handleClickOutsideCart = (e) => {
    const { cartButtonRef } = this.props;
    if (!cartButtonRef) {
      this.props.toggleCartVisible();
    } else if (this.elementRef && !this.elementRef.contains(e.target) && !cartButtonRef.contains(e.target)){
      this.props.toggleCartVisible();
    }
  }
  
  componentWillUnmount() {
    window.removeEventListener('mousedown', this.handleClickOutsideCart);
  }
  
  render() {
    const { cartItems, selectedCurrency } = this.props;
    let cartTotal = '';

    if ( selectedCurrency === 'eur' ) {
      cartTotal = cartItems.reduce((acc, item) => ( acc + item.price_eur * item.quantity ), 0).toFixed( 2 );
    } else {
      cartTotal = cartItems.reduce((acc, item) => ( acc + item.price_usd * item.quantity ), 0).toFixed( 2 );
    }
    
    return (
    <div className='cart-dropdown-container' ref={this.setRef}>
        {
        cartItems.length ? 
          (
          <div className='drawer'>
            <div className='all-items-container'>
              { cartItems.map((cartItem, index) => (
                <div key={index} className='cart-item-container'>
                  <div className='cart-item-image img-column'>
                    <img src={ require( `../../assets/${cartItem.image_url}` ) } alt='product'/>
                  </div>
                  <div className='cart-item-quantity info-column'>x{cartItem.quantity}</div>
                </div>
              ))}
            </div>
            <div className='cart-total'>
              <div className='text'>Total:</div>
              { 
                selectedCurrency === 'eur' ? 
                <div className='total-price'>&euro;  { cartTotal }</div>
                : <div className='total-price'>$  { cartTotal }</div>
              }
            </div>
            <div className='checkout-button-container'>
                <Link to='/checkout'>
                  <div className='checkout-button'>
                    Checkout
                  </div>
                </Link>
            </div>
          </div>
          ) :
          <div className='empty-message'>Your cart is empty</div> 
        }
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  cartItems: selectCartItems(state),
  selectedCurrency: selectCurrency(state)
});

const mapDispatchToProps = (dispatch) => ({
  toggleCartVisible: () => dispatch(toggleCartVisible())
});

export default connect(mapStateToProps, mapDispatchToProps)(CartDropdown);