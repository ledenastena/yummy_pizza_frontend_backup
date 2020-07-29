import productActionTypes from './product.types';
import { retrieveTypes } from './product.utils';

export const changeCurrency = () => ({
  type: productActionTypes.CHANGE_CURRENCY
});

/* Fetchin products actions */

export const fetchProductsStart = () => ({
  type: productActionTypes.FETCH_PRODUCTS_START
});

export const fetchProductsSuccess = ( response ) => ({
  type: productActionTypes.FETCH_PRODUCTS_SUCCESS,
  payload: response
});

export const fetchProductFailure = ( errorMessage ) => ({
  type: productActionTypes.FETCH_PRODUCTS_FAILURE,
  payload: errorMessage
});

export const fetchProductsStartAsync = ( optionalFetchParam = '' ) => {
  return (dispatch) => {
    const apiUrl = 'https://yummypizza-api.herokuapp.com/api/products' + optionalFetchParam;

//    optionalFetchParam is used to get only the products of the desired type from the backend,
//    the same endpoint is used to get all of the products, when optionalFetchParam is empty string

    dispatch( fetchProductsStart());

    fetch( apiUrl )
    .then( response => response.json())
    .then( data => {
      dispatch( fetchProductsSuccess( data ));
    })
    .catch( error => dispatch( fetchProductFailure( error.message )));
  }
}

/* Fetchin types actions */

export const fetchTypesStart = () => ({
  type: productActionTypes.FETCH_TYPES_START
});

export const fetchTypesSuccess = ( response ) => ({
  type: productActionTypes.FETCH_TYPES_SUCCESS,
  payload: response
});

export const fetchTypesFailure = ( errorMessage ) => ({
  type: productActionTypes.FETCH_TYPES_FAILURE,
  payload: errorMessage
});

export const fetchTypesStartAsync = ( typeParam ) => {
  return dispatch => {
    dispatch(fetchTypesStart());

//    Before we fetch the products, we fetch the product types from the backend so we get corresponding
//    product type ids and can filter our products based on this dynamicly retrieved value instead of 
//    hardcoding this value in the frontend. However this makes things more complicated, we are using
//    Redux Thunk to chain API calls in the required order.

    fetch( 'https://yummypizza-api.herokuapp.com/api/product-types' )
   .then( response => response.json())
   .then( data => {
     let typeObject = retrieveTypes( data ); // retrieveTypes converts response json data into a more appropriate form
     dispatch(fetchTypesSuccess( typeObject ));
     let optionalFetchParam = ''; // optional parameter that we can append to the api url for fetching the products

     switch ( typeParam ) {
       case ('pizzas'): 
        optionalFetchParam = '?product_type_id=' + typeObject.pizza; // we converted typeObject so the key 'pizza' corresponds to a 
        break; //                                                       pizza product type id in our database etc.
       case ('drinks'): 
        optionalFetchParam = '?product_type_id=' + typeObject.drink;
        break;
       case ('desserts'): 
        optionalFetchParam = '?product_type_id=' + typeObject.dessert;
        break;
       default: 
        optionalFetchParam = ''; // in any other case, this optional parameter is an empty string so that we eventually fetch all products in this case
     }

     dispatch( fetchProductsStartAsync ( optionalFetchParam )); // now that we determined what type of products we want to fetch and we formed the parameter string
 //                                                                we dispatch the action that fetches products from the backend 
   })
   .catch( error => {
     dispatch( fetchTypesFailure( error.message ))
   });
  }
}