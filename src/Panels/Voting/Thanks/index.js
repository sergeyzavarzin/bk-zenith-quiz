import React from 'react';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';
import Group from '@vkontakte/vkui/dist/components/Group/Group';
import {withAppContext} from '../../../context/AppContext';
import Button from '@vkontakte/vkui/dist/components/Button/Button';
import {Div} from '@vkontakte/vkui';

import Cup from '../../../img/trophy.svg';

import './Thanks.scss';

const Thanks = ({id, go}) => {
  return (
    <Panel id={id}>
      <PanelHeader>
        Спасибо
      </PanelHeader>
      <Group style={{background: '#fff'}}>
        <Div>
          <div className='thanks'>
            <img className='thanks__cup' src={Cup} alt='Cup'/>
            <h1 className='thanks__title'>
              Спасибо за ваш ответ!
            </h1>
            <p>

            </p>
            <Button
              size="xl"
              data-to='voting'
              onClick={go}
            >
              На главную
            </Button>
          </div>
        </Div>
      </Group>
    </Panel>
  )
};

export default withAppContext(Thanks);
