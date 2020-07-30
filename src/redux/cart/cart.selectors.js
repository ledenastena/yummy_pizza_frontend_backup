import { createSelector } from 'reselect';

const selectCart = (state) => state.cart;

export const selectCartItems = createSelector(
  [selectCart],
  cart => cart.cartItems
);

export const selectCartVisible = createSelector(
  [selectCart],
  cart => cart.cartVisible
);

export const selectShippingRate = createSelector(
  [selectCart],
  cart => cart.shippingRate
);

export const selectFetchingShippingRates = createSelector(
  [selectCart],
  cart => cart.fetchingShippingRates
);