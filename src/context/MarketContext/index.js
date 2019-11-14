import React, {Component} from 'react';
import axios from 'axios';

import {API_URL} from '../../constants/endpoints';

export const MarketContext = React.createContext(true);

class MarketContextProvider extends Component {

  state = {
    merch: null,
  };

  fetchMerch = () => {
    axios.get(`${API_URL}/merch`)
      .then(({data}) => this.setState({merch: data}))
      .catch(err => console.log(err));
  };

  render() {
    return (
      <MarketContext.Provider
        value={{
          state: this.state,
          fetchMerch: this.fetchMerch,
        }}
      >
        {this.props.children}
      </MarketContext.Provider>
    );
  }
}

export function withMarketContext(Component) {
  return function WrapperComponent(props) {
    return (
      <MarketContext.Consumer>
        {state => <Component {...props} context={state}/>}
      </MarketContext.Consumer>
    );
  };
}

export default MarketContextProvider;
