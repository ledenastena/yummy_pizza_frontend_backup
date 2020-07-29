import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import Header from './components/header/header.component';
import Footer from './components/footer/footer.component';
import HomePage from './pages/home/home.component';
import ProductsPage from './pages/products/products.component';
import CheckoutPage from './pages/checkout/checkout.component';

class App extends React.Component {
  componentDidMount() {
  }

  hashCode = ( str = '') => {
    let hash = 0;

    if (str.length === 0) {
        return hash;
    }
    for (let i = 0; i < str.length; i++) {
        let char = str.charCodeAt(i);
        hash = ((hash<<5)-hash)+char;
        hash = hash & hash; // Convert to 32bit integer
    }
    return hash;
}

  render() {
    return(
      <div className='app-container'>
        <Header />
        <div className='width-container'>
          <Switch>
            <Route path='/products/:type?' render={(props) => (
              <ProductsPage key={ this.hashCode(props.match.params.type) } {...props} />)} 
            />  
            {/* Using a hashCode function to get a unique key based on the 'type' parameter which is a string
                This way we ensure that ProductPage components  remounts when the route parameter changes      */}

            <Route path='/checkout' component={ CheckoutPage } />
            <Route path='/' component={ HomePage } />
          </Switch>
        </div>
        <Footer />
      </div>
    );
  }
}



export default App;