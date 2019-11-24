import React from 'react';
import axios from 'axios';
import {Panel, PanelHeader, HeaderButton, Button, Group, List, Cell, Avatar} from '@vkontakte/vkui';
import Icon24BrowserBack from '@vkontakte/icons/dist/24/browser_back';
import Icon20PlaceOutline from '@vkontakte/icons/dist/20/place_outline';
import Icon20HomeOutline from '@vkontakte/icons/dist/20/home_outline';
import Icon20MentionOutline from '@vkontakte/icons/dist/20/mention_outline';
import Icon20PhoneOutline from '@vkontakte/icons/dist/20/phone_outline';
import Icon20UserOutline from '@vkontakte/icons/dist/20/user_outline';
import Icon20MessageOutline from '@vkontakte/icons/dist/20/message_outline';
import Icon20RecentOutline from '@vkontakte/icons/dist/20/recent_outline';

import {API_URL} from '../../Constants/endpoints';
import {MERCH_TYPES} from '../../Constants/merchTypes';
import {withMarketContext} from '../../Contexts/MarketContext';

import {copyTextToClipboard} from '../../Utils/copyToClipboard';

import './OrderInfo.scss';

const STATUSES = {
  CREATED: 'В обработке',
};

class OrderInfo extends React.Component {

  state = {
    orderInfo: null,
    orderData: null,
    deliveryData: null,
  };

  componentDidMount() {
    this.fetchOrderInfo();
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const {selectedOrder} = nextProps.marketContext.state;
    if (selectedOrder) {
      const orderData = JSON.parse(selectedOrder.orderInfo);
      const deliveryData = JSON.parse(orderData.deliveryAddress);
      return {orderData, deliveryData};
    }
    return null;
  }

  fetchOrderInfo = () => {
    const {selectedOrder} = this.props.marketContext.state;
    axios
      .get(`${API_URL}/digital?orderId=${selectedOrder.id}`)
      .then(({data}) => this.setState({orderInfo: data || null}));
  };

  render() {
    const {id, go} = this.props;
    const {orderInfo, orderData, deliveryData} = this.state;
    const {merch, firstName, lastName, comment, status} = orderData;
    const {address, city, country, email, phone, postIndex,} = deliveryData;
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
        <Group title='Информация о товаре'>
          <List>
            {
              merch.name &&
              <Cell
                before={<Avatar type='image' src={merch.image}/>}
                description={`${merch.price} баллов`}
              >
                <b>{merch.name}</b>
              </Cell>
            }
          </List>
        </Group>
        {
          orderData.merch.type === MERCH_TYPES.DIGITAL ?
            <>
              {
                orderInfo &&
                <Group title='Ваш промокод'>
                  <List>
                    <Cell>
                      <div className='order-info__code'>{orderInfo.value}</div>
                      <Button
                        size='xl'
                        level='outline'
                        onClick={() => copyTextToClipboard(orderInfo.value)}
                      >
                        Скопировать
                      </Button>
                    </Cell>
                  </List>
                </Group>
              }
            </> :
            <>
              <Group title='Статус заказа'>
                <List>
                  <Cell before={<Icon20RecentOutline/>}>{STATUSES[status]}</Cell>
                </List>
              </Group>
              <Group title='Информация о заказе'>
                <List>
                  {
                    (firstName && lastName) &&
                    <Cell before={<Icon20UserOutline/>}>{firstName} {lastName}</Cell>
                  }
                  {
                    (country && city) &&
                    <Cell before={<Icon20PlaceOutline/>}>{country}, {city}</Cell>
                  }
                  {
                    (address && postIndex) &&
                    <Cell before={<Icon20HomeOutline/>}>{address}, {postIndex}</Cell>
                  }
                  {
                    email &&
                    <Cell before={<Icon20MentionOutline/>}>{email}</Cell>
                  }
                  {
                    phone &&
                    <Cell before={<Icon20PhoneOutline/>}>{phone}</Cell>
                  }
                  {
                    comment &&
                    <Cell before={<Icon20MessageOutline/>}>{comment}</Cell>
                  }
                </List>
              </Group>
            </>
        }
      </Panel>
    )
  }
}

export default withMarketContext(OrderInfo);
