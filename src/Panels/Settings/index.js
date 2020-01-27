import React from 'react';
import {Cell, Group, List, PanelHeader, Panel, HeaderButton, Switch} from '@vkontakte/vkui';
import Icon24BrowserBack from '@vkontakte/icons/dist/24/browser_back';
import {withAppContext} from '../../Contexts/AppContext';
import {MODALS} from '../../Constants/modals';

class Settings extends React.Component {

  toggleNotifications = () => {
    const {
      enableNotifications,
      disableNotifications,
      setVkParams,
      setActiveModal,
      state: {vkParams}
    } = this.props.appContext;
    if (vkParams.vk_are_notifications_enabled) {
      disableNotifications();
      setVkParams({...vkParams, vk_are_notifications_enabled: false});
      setActiveModal(MODALS.NOTIFICATIONS_ARE_DISABLED);
    } else {
      enableNotifications();
      setVkParams({...vkParams, vk_are_notifications_enabled: true});
    }
  };

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
            <Cell
              asideContent={
                <Switch
                  defaultChecked={this.props.appContext.state.vkParams.vk_are_notifications_enabled}
                  onChange={this.toggleNotifications}
                />
              }
            >
              Уведомления
            </Cell>
          </List>
        </Group>
      </Panel>
    )
  }
}

export default withAppContext(Settings);
