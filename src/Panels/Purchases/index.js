import React from 'react';
import {Panel, PanelHeader, HeaderButton, Group, List, Cell} from '@vkontakte/vkui';
import Icon24BrowserBack from '@vkontakte/icons/dist/24/browser_back';

import './Purchases.scss';

const Purchases = ({id, go}) => {
  return (
    <Panel id={id}>
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
        <List>
          <Cell expandable>
            1
          </Cell>
          <Cell expandable>
            1
          </Cell>
        </List>
      </Group>
    </Panel>
  )
};

export default Purchases;
