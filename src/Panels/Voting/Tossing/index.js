import React from 'react';
import {Div, FixedLayout, Button, Radio, FormLayout, Group, PanelHeader, Panel} from '@vkontakte/vkui';
import Icon24Back from '@vkontakte/icons/dist/24/back';

import {withAppContext} from '../../../Contexts/AppContext';

import Zenith from '../../../Images/zenith.png';
import HeaderButton from '@vkontakte/vkui/dist/components/HeaderButton/HeaderButton';

const Tossing = ({id, go, appContext}) => {
  const {setTossing, state} = appContext;
  const {rivals, activeMatchVote, tossing} = state;
  const currentRival = rivals && activeMatchVote && rivals.find(rival => rival.id === activeMatchVote.rivalId);
  return (
    <Panel id={id}>
      <PanelHeader
        left={
          <HeaderButton
            data-to='select-first-five'
            onClick={go}
          >
            <Icon24Back/>
          </HeaderButton>
        }
      >
        Вопрос 2 / 6
      </PanelHeader>
      <Group title="Кто выиграет вбрасывание?">
        <FormLayout>
          <Radio
            name="radio"
            onClick={() => setTossing(1)}
          >
            <Div
              style={{
                display: 'flex',
                alignItems: 'center',
                minHeight: 90,
              }}
            >
              <img width={40} src={Zenith} alt='Зенит'/>
              <b style={{marginLeft: 15}}>Зенит</b>
            </Div>
          </Radio>
          <Radio
            name="radio"
            onClick={() => setTossing(2)}
          >
            <Div
              style={{
                display: 'flex',
                alignItems: 'center',
                minHeight: 90,
              }}
            >
              <img width={40} src={currentRival.logo} alt={currentRival.name}/>
              <b style={{marginLeft: 15}}>{currentRival.name}</b>
            </Div>
          </Radio>
        </FormLayout>
        <FixedLayout vertical="bottom">
          <Group>
            <FormLayout>
              <Button
                style={tossing ? {} : {
                  opacity: 0.5,
                  pointerEvents: 'none',
                  userSelect: 'none',
                }}
                size="xl"
                data-to='select-two-score'
                onClick={go}
              >
                Выбрать
              </Button>
            </FormLayout>
          </Group>
        </FixedLayout>
      </Group>
    </Panel>
  )
};

export default withAppContext(Tossing);
