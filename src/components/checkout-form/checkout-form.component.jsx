import React from 'react';
import './checkout-form.styles.scss';
import SmallSpinner from '../small-spinner/small-spinner.component';
import { clearCartProducts } from '../../redux/cart/cart.actions';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

class CheckoutForm extends React.Component {
  state = {
    isLoading: false,
    success: false,
    name: '',
    number: '',
    address: '',
    errorMessage: ''
  }

  componentDidUpdate() {
    if ( this.state.success ) {
      setTimeout(() => {
        this.props.clearCartProducts();
        this.props.history.push('/');
      }, 1500)
    }
  }

  handleChange = ( e ) => {
    let key = e.target.name;
    let value = e.target.value;

    this.setState({
      [key]: value
    });

  }

  handleSubmit = ( e ) => {
    e.preventDefault();
    let { name, number, address } = this.state;

    
      this.setState({
        errorMessage: ''
      }, () => { 
        if ( name !== '' && number !== '' & address !== '' ) { // no empty fields
          this.setState({
            isLoading: true,
            name: '',
            number: '',
            address: ''
          });

          setTimeout( () => ( this.setState({
            isLoading: false,
            success: true
          })), 3000 );
        }
        else {
            this.setState({
            errorMessage: 'Please fiil out all fields'
            });
        }  
      });
  }

  render() {
    const { isLoading, success } = this.state;
    let buttonText = success ? 'Done' : 'Order';

    return (
      <div className='checkout-form-container'>
        <form onSubmit={ this.handleSubmit }>
          <label
            htmlFor='name'
            className='form-label'
            >
              Your Name
          </label>
          <input 
            id='name'
            type='text'
            name='name'
            value={ this.state.name }
            className='form-input'
            onChange={ this.handleChange }
          />
          <label
            htmlFor='number'
            className='form-label'
            >
              Your Number
          </label>
          <input
            id='number'
            type='text'
            name='number'
            value={ this.state.number }
            className='form-input'
            onChange={ this.handleChange }
          />
          <label
            htmlFor='address'
            className='form-label'
            >
              Your Addres
          </label>
          <input
            id='address'
            type='text'
            name='address'
            value={ this.state.address }
            className='form-input'
            onChange={ this.handleChange }
          />
          <div className='form-footer'>
            {
              this.state.errorMessage ?  
              <span className='error-message'>{ this.state.errorMessage }</span>
              : ''
            }
            <button type='submit' className='form-button'>
              {
                isLoading ?
                <SmallSpinner />
                : buttonText
              }
            </button>
          </div>
        </form>
      </div>
    );
  };
}

const mapDispatchToProps = (dispatch) => ({
  clearCartProducts: () => dispatch( clearCartProducts() )
});

export default connect( null, mapDispatchToProps )( withRouter(CheckoutForm) );