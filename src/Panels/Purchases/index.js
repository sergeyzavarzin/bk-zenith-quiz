import React from 'react';
import {Panel, PanelHeader, HeaderButton, Group, List, Cell, PanelSpinner, Avatar, Button} from '@vkontakte/vkui';
import Icon24BrowserBack from '@vkontakte/icons/dist/24/browser_back';
import Icon56MarketOutline from '@vkontakte/icons/dist/56/market_outline';

import Placeholder from '../../Components/Placeholder';

import {withMarketContext} from '../../Contexts/MarketContext';

import './Purchases.scss';

class Purchases extends React.Component {

  componentDidMount() {
    const {fetchUserOrders} = this.props.marketContext;
    fetchUserOrders();
  }

  render() {
    const {id, go, marketContext} = this.props;
    const {state: {orders: fetchedOrders}, setSelectedOrder} = marketContext;
    const orders = fetchedOrders && fetchedOrders.map(({id, orderInfo}) => {
      return {id, orderInfo: JSON.parse(orderInfo)}
    });
    return (
      <Panel id={id}>
        {
          orders ? <>
            <PanelHeader
              left={
                <HeaderButton
                  data-to='home'
                  onClick={go}
                >
                  <Icon24BrowserBack/>
                </HeaderButton>
              }
            >
              Мои покупки
            </PanelHeader>
            <Group>
              {
                orders.length ?
                  <List>
                    {
                      orders.map(item =>
                        <Cell
                          key={item.id}
                          before={<Avatar type='image' src={item.orderInfo.merch.image}/>}
                          description={`${item.orderInfo.total} баллов`}
                          data-to='order-info'
                          onClick={e => {
                            setSelectedOrder(item.id);
                            go(e);
                          }}
                          expandable
                        >
                          {item.orderInfo.merch.name}
                        </Cell>
                      )
                    }
                  </List> :
                  <Placeholder
                    icon={<Icon56MarketOutline/>}
                    title='Здесь будут отображаться ваши заказы'
                    action={
                      <Button
                        size='xl'
                        type='secondary'
                        data-to='market'
                        onClick={go}
                      >
                        Перейти в магазин
                      </Button>
                    }
                  />
              }
            </Group>
          </> : <PanelSpinner/>
        }
      </Panel>
    )
  }
}

export default withMarketContext(Purchases);
