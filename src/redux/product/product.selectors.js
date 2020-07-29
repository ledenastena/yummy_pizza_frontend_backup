import { createSelector } from 'reselect';

const selectProduct = state => state.product;

export const selectItems = createSelector(
  [ selectProduct ],
  product => product.items
);

export const selectTypes = createSelector(
  [ selectProduct ],
  product => product.types
);

export const selectIsFetching = createSelector(
  [ selectProduct ],
  product => product.isFetching
);

export const selectErrorMessage = createSelector(
  [ selectProduct ],
  product => product.errorMessage
);

export const selectCurrency = createSelector(
  [ selectProduct ],
  product => product.selectedCurrency
);