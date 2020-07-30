import React from 'react';
import './single-product.styles.scss';
import { addProductToCart, toggleCartVisible } from '../../redux/cart/cart.actions';
import { selectCurrency } from '../../redux/product/product.selectors';
import { connect } from 'react-redux';

class SingleProduct extends React.Component {
  state = {
    quantity: 0
  }
  
  handleChange = ( e ) => {
    this.setState({
      quantity: parseInt( e.target.value )
    });
  }

  handleMinusClick = () => {
    if ( this.state.quantity > 0 )
      this.setState( prevState => ({
        quantity: prevState.quantity - 1
      }));
  }

  handlePlusClick = () => {
    if ( this.state.quantity < 10 )
      this.setState( prevState => ({
        quantity: prevState.quantity + 1
      }));
  }
  handleAddToCartClick = () => {    
    const { addProductToCart, toggleCartVisible, item } = this.props;
    const quantity = this.state.quantity;
    
    if ( quantity > 0 ) {
      addProductToCart({ item, quantity });
      toggleCartVisible();
      this.setState({
        quantity: 0
      });
    }
  }

  render() {
    const { item, selectedCurrency } = this.props;
    
    return (
      <div className='single-product-container'>              
          <img className='list-image' src={ require( `../../assets/${item.image_url}` ) } alt='prodict-image' />
          <span className='item-title'>{ item.name }</span>
          {
           ( selectedCurrency === 'eur' )?
              <span className='item-price'>&euro; { item.price_eur }</span>
              :
              <span className='item-price'>$ { item.price_usd }</span>      
          }
          <div className='quantity-section'>
            <div className='small-btn minus-quantity' onClick={ this.handleMinusClick }>-</div>
            <input className='display-quantity' value={ this.state.quantity } onChange={ this.handleChange } readOnly />
            <div className='small-btn plus-quantity' onClick={ this.handlePlusClick }>+</div>
          </div>
          <div className='add-to-cart-section'>
            <div className='add-to-cart-button' onClick={ this.handleAddToCartClick }>Add to Cart</div>
          </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  selectedCurrency: selectCurrency(state)
});

const mapDispatchToProps = ( dispatch ) => ({
  addProductToCart: ( payload ) => dispatch( addProductToCart( payload )),
  toggleCartVisible: () => dispatch( toggleCartVisible()),
})

export default connect( mapStateToProps, mapDispatchToProps )( SingleProduct );