import React from 'react';
import './product-list.styles.scss';
import SingleProduct from '../single-product/single-product.component';
import { selectItems } from '../../redux/product/product.selectors';
import { connect } from 'react-redux';

class ProductList extends React.Component {
  render() {
    const { items } = this.props;
    return (
      <div className='product-list-container'>
        <div className='row'>
          {items.map( item => (
            <div key={ item.id } className='col-3 col-m-4 col-s-6'>
                <SingleProduct item={ item } />
            </div>          
          ))}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  items: selectItems( state )
});

export default connect( mapStateToProps )( ProductList );