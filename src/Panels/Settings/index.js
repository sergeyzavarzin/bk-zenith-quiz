import React from 'react';
import {Cell, Group, List, PanelHeader, Panel, HeaderButton, Button} from '@vkontakte/vkui';
import Icon24BrowserBack from '@vkontakte/icons/dist/24/browser_back';

class Settings extends React.Component {

  render() {
    const {id, go} = this.props;
    return (
      <Panel id={id}>
        <PanelHeader
          left={
            <HeaderButton data-to='home' onClick={go}>
              <Icon24BrowserBack/>
            </HeaderButton>
          }
        >
          Настройки
        </PanelHeader>
        <Group>
          <List>
            <Cell>
              <div style={{
                textAlign: 'center',
                marginBottom: 10,
                fontSize: 18,
              }}
              >
                Отписаться от новостой рассылки
              </div>
              <Button size='xl'>
                Отписаться
              </Button>
            </Cell>
          </List>
        </Group>
      </Panel>
    )
  }
}

export default Settings;
