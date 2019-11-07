import React from 'react';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';
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
      <Div>
        <div className='thanks'>
          <img className='thanks__cup' src={Cup} alt='Cup'/>
          <h1 className='thanks__title'>
            Спасибо за ваш ответ!
          </h1>
          <p className='thanks__text'>
            Результаты матча будут объявлены после завершения матча.
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
    </Panel>
  )
};

export default withAppContext(Thanks);
