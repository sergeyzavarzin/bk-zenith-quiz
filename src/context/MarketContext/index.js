import React, {Component} from 'react';
import axios from 'axios';

import {API_URL} from '../../constants/endpoints';

export const MarketContext = React.createContext(true);

class MarketContextProvider extends Component {

  state = {
    merch: null,
    selectedMerchItem: null,
  };

  fetchMerch = () => {
    axios.get(`${API_URL}/merch`)
      .then(({data}) => this.setState({merch: data}))
      .catch(err => console.log(err));
  };

  setSelectedMerchItem = id => {
    const {merch} = this.state;
    this.setState({
      selectedMerchItem: merch.find(item => item.id === id)
    })
  };

  render() {
    return (
      <MarketContext.Provider
        value={{
          state: this.state,
          fetchMerch: this.fetchMerch,
          setSelectedMerchItem: this.setSelectedMerchItem,
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
        {state => <Component {...props} marketContext={state}/>}
      </MarketContext.Consumer>
    );
  };
}

export default MarketContextProvider;
