import React from 'react';
import {Panel, PanelHeader, HeaderButton, Div} from '@vkontakte/vkui';
import Icon24Sort from '@vkontakte/icons/dist/24/sort';

import {withAppContext} from '../../context/AppContext';
import MarketItem from './MarketItem';

const Store = ({id}) => {
  return (
    <Panel id={id}>
      <PanelHeader
        left={<HeaderButton><Icon24Sort/></HeaderButton>}
      >
        Магазин
      </PanelHeader>
      <Div>
        <MarketItem
          image='https://printbar.ru/upload/thumb/images/87/875d6fe5ja81_320x0.jpg'
          name='Майка с принтом'
          price={300}
        />
        <MarketItem
          image='http://basket.fc-zenit.ru/upload/resize_cache/iblock/848/820_1300_0/8480c536fb94f2181deb43d91953e440.jpg'
          name='Билет на матч'
          price={500}
        />
      </Div>
    </Panel>
  )
};

export default withAppContext(Store);
