import React from 'react';
import {Div, Button, Panel, PanelHeader} from '@vkontakte/vkui';

import {withAppContext} from '../../../Contexts/AppContext';
import {MODALS} from '../../../Constants/modals';

import Cup from '../../../Images/trophy.svg';

import './Thanks.scss';

const Thanks = ({id, go, appContext}) => {
  const {state, setActiveModal} = appContext;
  const hasRepost = state.isUserCreateRepostForCurrentMatch;
  const isNotificationsEnabled = state.vkParams.vk_are_notifications_enabled;
  return (
    <Panel id={id}>
      <PanelHeader>
        Спасибо
      </PanelHeader>
      <Div>
        <div className='thanks'>
          <img className='thanks__cup' src={Cup} alt='Cup'/>
          <h1 className='thanks__title'>Спасибо за ваш ответ!</h1>
          <p className='thanks__text'>
            Результаты будут объявлены через несколько часов после завершения матча.
          </p>
          <Button
            size='xl'
            data-to='voting'
            onClick={e => {
              go(e);
              if (!isNotificationsEnabled && !hasRepost) {
                setActiveModal(MODALS.INVITE_TO_ENABLE_NOTIFICATIONS);
              } else if (isNotificationsEnabled && !hasRepost) {
                setActiveModal(MODALS.INVITE_TO_REPOST);
              }
            }}
          >
            На главную
          </Button>
        </div>
      </Div>
    </Panel>
  )
};

export default withAppContext(Thanks);
