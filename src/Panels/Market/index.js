import React from 'react';
import {Panel, PanelHeader, HeaderButton, Div, PanelSpinner} from '@vkontakte/vkui';
import Icon24BrowserBack from '@vkontakte/icons/dist/24/browser_back';

import {withMarketContext} from '../../Contexts/MarketContext';

import MarketItem from './MarketItem';

import './Market.scss';

class Store extends React.Component {

  componentDidMount() {
    const {fetchMerch, state: {merch}} = this.props.marketContext;
    if (!merch) {
      fetchMerch();
    }
  }

  render() {
    const {id, go, marketContext} = this.props;
    const {merch} = marketContext.state;
    return (
      <Panel id={id}>
        <PanelHeader
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
