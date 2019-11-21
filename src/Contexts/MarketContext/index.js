import React, {Component} from 'react';
import axios from 'axios';

import {API_URL} from '../../Constants/endpoints';
import {queryParams} from '../../Utils/queryParams';

export const MarketContext = React.createContext(true);

class MarketContextProvider extends Component {

  state = {
    merch: null,
    selectedMerchItem: null,
    orders: [],
    selectedOrder: null,
  };

  fetchMerch = () => {
    axios
      .get(`${API_URL}/merch`)
      .then(({data}) => this.setState({merch: data.filter(item => item.count > 0)}))
      .catch(err => console.log(err));
  };

  setSelectedMerchItem = id => {
    const {merch} = this.state;
    this.setState({
      selectedMerchItem: merch.find(item => item.id === id)
    })
  };

  setSelectedOrder = id => {
    const {orders} = this.state;
    this.setState({
      selectedOrder: orders.find(order => order.id === id)
    })
  };

  createOrder = (id, userId, merchId, total, createDateTime, deliveryAddress, status, comment, cb) => {
    const {merch} = this.state;
    const orderInfo = JSON.stringify({
      merch: merch.find(item => item.id === merchId),
      total, createDateTime, deliveryAddress, status, comment
    });
    const data = {id, userId, orderInfo};
    axios
      .post(`${API_URL}/order`, data)
      .then(({data}) => this.setState(prevState => {
        return {orders: [...prevState.orders, data] }
      }, () => !!cb & cb()))
      .catch(err => console.log(err));
  };

  fetchUserOrders = userId => {
    axios
      .get(`${API_URL}/order?${queryParams({userId})}`)
      .then(({data}) => this.setState({orders: data}))
      .catch(() => 1);
  };

  render() {
    return (
      <MarketContext.Provider
        value={{
          state: this.state,
          fetchMerch: this.fetchMerch,
          setSelectedMerchItem: this.setSelectedMerchItem,
          setSelectedOrder: this.setSelectedOrder,
          createOrder: this.createOrder,
          fetchUserOrders: this.fetchUserOrders,
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
