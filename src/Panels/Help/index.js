import React from 'react';
import {PanelHeader, Panel, List, Group, Cell, HeaderButton} from '@vkontakte/vkui';
import Icon24Back from '@vkontakte/icons/dist/24/back';

import {withHelpContext} from '../../Contexts/HelpContext';

import {help} from '../../Constants/help';

const Help = ({id, go, helpContext: {selectHelp}}) => {
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
