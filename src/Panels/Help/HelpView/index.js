import React from 'react';
import {Div, Group, PanelHeader, Panel, HeaderButton} from '@vkontakte/vkui';
import Icon24Back from '@vkontakte/icons/dist/24/back';

import {withHelpContext} from '../../../context/HelpContext';

const HelpView = ({id, go, helpContext}) => {
  const {selectHelp, state: {selectedHelp}} = helpContext;
  const goBack = (event) => {
    selectHelp(null);
    go(event);
  };
  return (
    <Panel id={id}>
      <PanelHeader
        left={
          <HeaderButton
            data-to='help'
            onClick={goBack}
          >
            <Icon24Back/>
          </HeaderButton>
        }>
        Помощь
      </PanelHeader>
      {
        selectedHelp &&
        <Group title={selectedHelp.q}>
          <Div>
            {selectedHelp.a}
          </Div>
        </Group>
      }
    </Panel>
  )
};

export default withHelpContext(HelpView);
