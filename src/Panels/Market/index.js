import React from 'react';
import {
  Panel, PanelHeader, HeaderButton,
  Div, PanelSpinner, FixedLayout,
  Tabs, TabsItem,
} from '@vkontakte/vkui';
import Icon24BrowserBack from '@vkontakte/icons/dist/24/browser_back';

import {withMarketContext} from '../../Contexts/MarketContext';

import {MERCH_TYPES} from '../../Constants/merchTypes';
import MarketItem from './MarketItem';

import './Market.scss';

class Store extends React.Component {

  state = {
    type: MERCH_TYPES.DIGITAL,
  };

  componentDidMount() {
    const {fetchMerch, state: {merch}} = this.props.marketContext;
    if (!merch) {
      fetchMerch();
    }
  }

  render() {
    const {type} = this.state;
    const {id, go, marketContext} = this.props;
    const {merch: merches} = marketContext.state;
    const merch = merches && merches.filter(item => item.type === type);
    return (
      <Panel id={id}>
        <PanelHeader
          noShadow
          left={
            <HeaderButton
              data-to='home'
              onClick={go}
            >
              <Icon24BrowserBack/>
            </HeaderButton>}
        >
          Магазин
        </PanelHeader>
        <FixedLayout vertical='bottom'>
          <Tabs type='default'>
            <TabsItem
              onClick={() => this.setState({type: MERCH_TYPES.DIGITAL})}
              selected={type === MERCH_TYPES.DIGITAL}
            >
              Билеты
            </TabsItem>
            <TabsItem
              onClick={() => this.setState({type: MERCH_TYPES.PHYSICAL})}
              selected={type === MERCH_TYPES.PHYSICAL}
            >
              Атрибутика
            </TabsItem>
          </Tabs>
        </FixedLayout>
        <Div>
          <div className='market'>
            {
              merch ? merch.slice().reverse().map(item =>
                <MarketItem
                  key={item.id}
                  id={item.id}
                  image={item.image}
                  name={item.name}
                  price={item.price}
                  go={go}
                />
              ) : <PanelSpinner/>
            }
          </div>
        </Div>
      </Panel>
    )
  }
}

export default withMarketContext(Store);
