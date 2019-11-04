import React from 'react';
import Group from '@vkontakte/vkui/dist/components/Group/Group';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';
import {Div} from '@vkontakte/vkui';
import Icon24Back from '@vkontakte/icons/dist/24/back';

import {withHelpContext} from '../../../context/HelpContext';
import HeaderButton from '@vkontakte/vkui/dist/components/HeaderButton/HeaderButton';

const HelpView = ({id, go, context}) => {
  const {selectHelp, state: {selectedHelp}} = context;
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
