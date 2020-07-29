import cartActionTypes from './cart.types';

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