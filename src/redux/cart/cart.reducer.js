import { insertIntoCart, decreaseProductQuantity, increaseProductQuantity, getRate  } from './cart.utils.js';
import cartActionTypes  from './cart.types';

const INITIAL_STATE = {
  cartItems: [],
  cartVisible: false,
  shippingRate: {},
  fetchingShippingRates: false,
  errorMessage: ''
}

const cartReducer = ( state = INITIAL_STATE, action ) => {
  switch ( action.type ) {
    case ( cartActionTypes.ADD_PRODUCT_TO_CART ): {
      return {
        ...state,
        cartItems: insertIntoCart( state.cartItems, action.payload.item, action.payload.quantity )
      }
    }
    case ( cartActionTypes.TOGGLE_CART_VISIBLE ): {
      return {
        ...state,
        cartVisible: !state.cartVisible
      }
    }
    case ( cartActionTypes.CLEAR_PRODUCT_FROM_CART ): {
      return {
      ...state,
      cartItems: state.cartItems.filter( cartItem => ( cartItem.id !== action.payload.id || cartItem.selectedSize !== action.payload.selectedSize ))
      }
    }
    case ( cartActionTypes.DECREASE_PRODUCT_QUANTITY ): {
      return {
        ...state,
        cartItems: decreaseProductQuantity( state.cartItems, action.payload )
      }
    }
    case ( cartActionTypes.INCREASE_PRODUCT_QUANTITY ): {
      return {
        ...state,
        cartItems: increaseProductQuantity( state.cartItems, action.payload )
      }
    }
    case ( cartActionTypes.CLEAR_CART_PRODUCTS ): {
      return {
        ...state,
        cartItems: []
      }
    }
    case ( cartActionTypes.FETCH_SHIPPING_RATES_START ): {
      return {
        ...state,
        fetchingShippingRates: true
      }
    }
    case ( cartActionTypes.FETCH_SHIPPING_RATES_SUCCESS ): {
      return {
        ...state,
        fetchingShippingRates: false,
        shippingRate: getRate( action.payload )
      }
    }
    case ( cartActionTypes.FETCH_SHIPPING_RATES_FAILURE ): {
      return {
        ...state,
        fetchingShippingRates: false,
        errorMessage: action.payload
      }
    }
    default : {
      return state;
    }
  }
}

export default cartReducer;