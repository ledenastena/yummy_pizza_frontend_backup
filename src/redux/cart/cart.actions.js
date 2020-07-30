import cartActionTypes from './cart.types';
import { fetchProductsSuccess } from '../product/product.actions';

export const addProductToCart = (payload) => ({
  type: cartActionTypes.ADD_PRODUCT_TO_CART,
  payload: payload
});

export const clearCartProducts = () => ({
  type: cartActionTypes.CLEAR_CART_PRODUCTS
});

export const toggleCartVisible = () => ({
  type: cartActionTypes.TOGGLE_CART_VISIBLE
});

export const clearProductFromCart = (payload) => ({
  type: cartActionTypes.CLEAR_PRODUCT_FROM_CART,
  payload: payload
});

export const decreaseProductQuantity = (payload) => ({
  type: cartActionTypes.DECREASE_PRODUCT_QUANTITY,
  payload: payload
});

export const increaseProductQuantity = (payload) => ({
  type: cartActionTypes.INCREASE_PRODUCT_QUANTITY,
  payload: payload
});

export const fetchShippingRatesStart = () => ({
  type: cartActionTypes.FETCH_SHIPPING_RATES_START
});

export const fetchShippingRatesSuccess = ( shippingRates ) => ({
  type: cartActionTypes.FETCH_SHIPPING_RATES_SUCCESS,
  payload: shippingRates
});

export const fetchShippingRatesFailure = ( errorMessage ) => ({
  type: cartActionTypes.FETCH_SHIPPING_RATES_FAILURE,
  payload: errorMessage
});

export const fetchShippingRatesStartAsync = () => {
  return ( dispatch ) => {
    const apiUrl = 'https://yummypizza-api.herokuapp.com/api/shipping-rates';

    dispatch( fetchShippingRatesStart() );

    fetch( apiUrl )
    .then( response => {
      return response.json() 
    })
    
    .then( data => {
      dispatch( fetchShippingRatesSuccess( data ) );
    })
    .catch( error => dispatch( fetchShippingRatesFailure( error.message )));
  }
}