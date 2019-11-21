import React from 'react';
import axios from 'axios';

import {Panel, PanelHeader, HeaderButton, PanelSpinner, Group, List, Cell} from '@vkontakte/vkui';
import Icon24BrowserBack from '@vkontakte/icons/dist/24/browser_back';

import {withMarketContext} from '../../Contexts/MarketContext';

import './OrderInfo.scss';
import {API_URL} from '../../Constants/endpoints';

class OrderInfo extends React.Component {

  state = {
    orderInfo: null,
  };

  componentDidMount() {
    this.fetchOrderInfo();
  }

  fetchOrderInfo = () => {
    const {selectedOrder} = this.props.marketContext.state;
    axios
      .get(`${API_URL}/digital?orderId=${selectedOrder.id}`)
      .then(({data: orderInfo}) => this.setState({orderInfo}))
  };

  render() {
    const {id, go, marketContext} = this.props;
    const {orderInfo} = this.state;
    const {selectedOrder} = marketContext.state;
    const orderData = JSON.stringify(selectedOrder.orderInfo);
    console.log(orderData)
    return (
      <Panel id={id}>
        <PanelHeader
          left={
            <HeaderButton
              data-to='purchases'
              onClick={go}
            >
              <Icon24BrowserBack/>
            </HeaderButton>
          }
        >
          Информация о заказе
        </PanelHeader>
        {
          orderInfo ?
            <Group title="Ваш промокод">
              <List>
                <Cell>
                  <b>{orderInfo.value}</b>
                </Cell>
              </List>
            </Group> :
            <PanelSpinner/>
        }
      </Panel>
    )
  }
}

export default withMarketContext(OrderInfo);
