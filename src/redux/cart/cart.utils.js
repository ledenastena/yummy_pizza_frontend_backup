export const insertIntoCart = (cartItems, itemToInsert, quantity) => {
  var insertPosition = null;
  
  
  cartItems.forEach((cartItem, index) => {
    if (cartItem.id === itemToInsert.id) {
      insertPosition = index;
    }
  });
  
  if (insertPosition === null) {
    return ([
      ...cartItems, 
      {
        ...itemToInsert,
        quantity: quantity
      }
    ]);
  } else {
    return (
      cartItems.map((item, index) => (
        (index === insertPosition)?
        {
          ...item,
          quantity: item.quantity + quantity
        }
        : item      
      )));
  }  
}

export const decreaseProductQuantity = (cartItems, item) => {
  if(item.quantity === 1) {
    return cartItems.filter(cartItem => (cartItem.id !== item.id || cartItem.selectedSize !== item.selectedSize));
  } else {
    return cartItems.map(cartItem => {
      if (cartItem.id === item.id && cartItem.selectedSize === item.selectedSize) {
       return {
          ...cartItem,
          quantity: cartItem.quantity - 1          
         } 
      } else {
        return cartItem;
      }
    });
  }
}

export const increaseProductQuantity = (cartItems, item) => {
  return cartItems.map(cartItem => {
    if (cartItem.id === item.id && cartItem.selectedSize === item.selectedSize) {
      return {
        ...cartItem,
        quantity: cartItem.quantity + 1          
        } 
    } else {
      return cartItem;
    }
  });
}

export const getRate = ( shippingRates ) => {
  let rates =  shippingRates.find( rate => rate.name === 'Standard rate');  

  return rates;
}