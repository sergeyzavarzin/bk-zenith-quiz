import React from 'react';
import {Panel, PanelHeader, HeaderButton, Div, PanelSpinner} from '@vkontakte/vkui';
import Icon24BrowserBack from '@vkontakte/icons/dist/24/browser_back';

import {withMarketContext} from '../../context/MarketContext';

import MarketItem from './MarketItem';

class Store extends React.Component {

  componentDidMount() {
    const {fetchMerch, state: {merch}} = this.props.context;
    if (!merch) {
      fetchMerch();
    }
  }

  render() {
    const {id, go, context} = this.props;
    const {merch} = context.state;
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
          {
            merch ? merch.map(item =>
              <MarketItem
                key={item.id}
                image={item.image}
                name={item.name}
                price={item.price}
              />
            ) : <PanelSpinner/>
          }
        </Div>
      </Panel>
    )
  }
}

export default withMarketContext(Store);
