import productActionTypes from './product.types';

const INITIAL_STATE = {
  items: [],
  types: {},
  isFetching: false,
  errorMessage: undefined,
  selectedCurrency: 'eur'
}

const productReducer = (state = INITIAL_STATE, action) => {
  switch( action.type ) {
    case (productActionTypes.FETCH_PRODUCTS_START): {
      return {
        ...state,
        isFetching: true
      }
    }
    case (productActionTypes.FETCH_PRODUCTS_SUCCESS): {
      return {
        ...state,
        isFetching: false,
        items: action.payload
      }
    }
    case (productActionTypes.FETCH_PRODUCTS_FAILURE): {
      return {
        ...state,
        isFetching: false,
        errorMessage: action.payload
      }
    }
    case (productActionTypes.FETCH_TYPES_START): {
      return {
        ...state,
        isFetching: true
      }
    }
    case (productActionTypes.FETCH_TYPES_SUCCESS): {
      return {
        ...state,
        types: action.payload
      }
    }
    case (productActionTypes.FETCH_TYPES_FAILURE): {
      return {
        ...state,
        isFetching: false,
        errorMessage: action.payload
      }
    }
    case ( productActionTypes.CHANGE_CURRENCY ): {
      return {
        ...state,
        selectedCurrency: state.selectedCurrency === 'eur' ? 'usd' : 'eur'
      }
    }
    default: {
      return {
        ...state
      }
    }
  }
}

export default productReducer;