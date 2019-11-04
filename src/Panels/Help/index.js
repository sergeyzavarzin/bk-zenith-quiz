import React from 'react';
import Cell from '@vkontakte/vkui/dist/components/Cell/Cell';
import Group from '@vkontakte/vkui/dist/components/Group/Group';
import List from '@vkontakte/vkui/dist/components/List/List';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';
import Icon24Back from '@vkontakte/icons/dist/24/back';

import {withHelpContext} from '../../context/HelpContext';
import {help} from '../../constants/help';
import HeaderButton from '@vkontakte/vkui/dist/components/HeaderButton/HeaderButton';

const Help = ({id, go, context: {selectHelp}}) => {
  const select = (e) => {
    selectHelp(e.currentTarget.dataset.help);
    go(e);
  };
  return (
    <Panel id={id}>
      <PanelHeader
        left={
          <HeaderButton
            data-to='home'
            onClick={go}
          >
            <Icon24Back/>
          </HeaderButton>
        }
      >
        Помощь
      </PanelHeader>
      <Group>
        <List>
          {
            help.map(item =>
              <Cell
                key={item.id}
                multiline
                expandable
                data-to='help-answer'
                data-help={item.id}
                onClick={select}
              >
                {item.q}
              </Cell>
            )
          }
        </List>
      </Group>
    </Panel>
  )
};

export default withHelpContext(Help);
