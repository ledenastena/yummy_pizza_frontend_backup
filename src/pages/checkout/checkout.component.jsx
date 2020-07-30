import React from 'react';
import './checkout.styles.scss';
import { selectCartItems, selectCartVisible, selectShippingRate, selectFetchingShippingRates } from '../../redux/cart/cart.selectors';
import { selectCurrency } from '../../redux/product/product.selectors';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import CheckoutForm from '../../components/checkout-form/checkout-form.component';
import { clearProductFromCart, toggleCartVisible, decreaseProductQuantity, increaseProductQuantity, fetchShippingRatesStartAsync } from '../../redux/cart/cart.actions';
import { connect } from 'react-redux';

class CheckoutPage extends React.Component {
  componentDidMount() {
    const { fetchShippingRatesStartAsync } = this.props;

    if (this.props.cartVisible) {
      this.props.toggleCartVisible();
    }

    fetchShippingRatesStartAsync();
  }
  
  render(){
    const { cartItems, clearProductFromCart, decreaseProductQuantity, increaseProductQuantity, selectedCurrency, shippingRate, fetchingShippingRates } = this.props;
    let cartTotal = 0;
    
    if ( selectedCurrency === 'eur' ) {
      cartTotal = cartItems.reduce(( acc, item ) => ( acc + parseFloat( item.price_eur ) * item.quantity ), 0 );
      if (!fetchingShippingRates) {
        cartTotal += parseFloat( shippingRate.amount_eur );
      }
    } else {
      cartTotal = cartItems.reduce(( acc, item ) => (acc + parseFloat( item.price_usd ) * item.quantity ), 0 );
      if (!fetchingShippingRates) {
        cartTotal += parseFloat( shippingRate.amount_usd );
      }
    }

    if (cartItems.length) {
      return (
        <div className='checkout-page-container'>
          <div className='checkout-headings'>
            <span className='heading img-column'></span>
            <span className='heading info-column'>Qty</span>
            <span className='heading info-column'>Price</span>
            <span className='heading remove-column' />
          </div>
          { cartItems.map(( cartItem, index ) => (
            <div key={ index } className='checkout-item-container'>
              <div className='img-column'>
                <div className='checkout-item-image'>
                  <img src={ require( `../../assets/${ cartItem.image_url }` ) } alt='product'/>
                </div>
              </div>
              <div className='checkout-item-quantity info-column'>
                <div className='small-btn minus-quantity' onClick={ () => decreaseProductQuantity( cartItem ) }>-</div>
                <input className='display-quantity' value={ cartItem.quantity } readOnly />
                <div className='small-btn plus-quantity' onClick={ () => increaseProductQuantity( cartItem ) }>+</div>
              </div>
                { 
                  selectedCurrency === 'eur' ? 
                  <div className='checkout-item-price info-column'>
                    &euro;  { ( parseFloat( cartItem.price_eur ) * cartItem.quantity ).toFixed( 2 ) }    
                  </div>
                  : <div className='checkout-item-price info-column'>
                    $  { ( parseFloat( cartItem.price_usd ) * cartItem.quantity ).toFixed( 2 ) }
                    </div>
                }
              <div className='checkout-item-trash remove-column'>
                <FontAwesomeIcon icon={ faTrashAlt } onClick={() => ( clearProductFromCart( cartItem ))} />
              </div>
            </div>
          ))}
          <div className='shipping-rate'>
            <div className='text'>+ delivery:</div>
            <div className='amount'>
              { 
                !fetchingShippingRates ?

                    selectedCurrency === 'eur' ? 
                    <span>&euro; { shippingRate.amount_eur }</span>  
                    : <span>$  { shippingRate.amount_usd }</span> 

                : 'loading...'
              }
            </div>
            <div className='remove-column' />
          </div>
          <div className='checkout-total'>
            <div className='text'>Total:</div>
            <div className='total-price'>
            { 
                selectedCurrency === 'eur' ? 
                <span>&euro; { cartTotal.toFixed( 2 ) }</span>  
                : <span>$  { cartTotal.toFixed( 2 ) }</span>
            }
            </div>
            <div className='remove-column' />
          </div>
          <div className='form-wrapper'>
            <CheckoutForm />
          </div>
        </div>
      );
    } else {
      return (
        <div className='checkout-page-container'>
          <div className='empty-cart-message'>
            You have no products in your cart.
          </div>          
        </div>
      );
    }
  }
}

const mapStateToProps = (state) => ({
  cartItems: selectCartItems(state),
  selectedCurrency: selectCurrency(state),
  cartVisible: selectCartVisible(state),
  shippingRate: selectShippingRate(state),
  fetchingShippingRates: selectFetchingShippingRates(state)
});

const mapDispatchToProps = (dispatch) => ({
  clearProductFromCart: ( payload ) => dispatch( clearProductFromCart(payload) ),
  toggleCartVisible: ( payload ) => dispatch( toggleCartVisible(payload) ),
  decreaseProductQuantity: ( payload ) => dispatch( decreaseProductQuantity(payload) ),
  increaseProductQuantity: ( payload ) => dispatch( increaseProductQuantity(payload) ),
  fetchShippingRatesStartAsync: () => dispatch( fetchShippingRatesStartAsync() )
});

export default connect( mapStateToProps, mapDispatchToProps )( CheckoutPage );