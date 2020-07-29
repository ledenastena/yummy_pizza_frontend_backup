import React from 'react';
import './products.styles.scss';
import ProductList from '../../components/product-list/product-list.component';
import Spinner from '../../components/spinner/spinner.component';
import { fetchTypesStartAsync } from '../../redux/product/product.actions';
import { selectItems, selectIsFetching, selectErrorMessage } from '../../redux/product/product.selectors';
import { connect } from 'react-redux';

class ProductsPage extends React.Component {  

  componentDidMount() {
    const { fetchTypesStartAsync } = this.props;
    const typeParam = this.props.match.params.type;

    fetchTypesStartAsync( typeParam );
  }

  render() {
    const { items, isFetching, errorMessage } = this.props;
    if ( isFetching ) {
      return (
        <div className='products-page-container'>
          <div className='loading-div'>
            Loading...
            <Spinner />
          </div>
        </div>
      )
    }
    else {
      if ( items.length === 0) {
        return (
          <div className='products-page-container'>
             { errorMessage?
               <div className='error-message'>
                 There was an error: { errorMessage }
                </div>
               :
               <div className='error-message'>
                 No products match the search parameters
                </div>
             }
          </div>
        );
      }

      return (
        <div className='products-page-container'>
          <ProductList />
        </div>
      );
    }
  }
}

const mapStateToProps = ( state ) => ({
  isFetching: selectIsFetching( state ),
  items: selectItems( state ),
  errorMessage: selectErrorMessage( state )
});

const mapDispatchToProps = ( dispatch ) => ({
  fetchTypesStartAsync: ( typeParam ) => dispatch( fetchTypesStartAsync( typeParam ))
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductsPage);