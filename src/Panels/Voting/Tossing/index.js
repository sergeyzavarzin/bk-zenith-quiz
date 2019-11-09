import React from 'react';
import {Div, FixedLayout, Button, Radio, FormLayout, Group, PanelHeader, Panel} from '@vkontakte/vkui';

import {withAppContext} from '../../../context/AppContext';

import Zenith from '../../../img/zenith.png';

const Tossing = ({id, go, context}) => {
  const {setTossing, state} = context;
  const {rivals, activeMatchVote, tossing} = state;
  const currentRival = rivals && activeMatchVote && rivals.find(rival => rival.id === activeMatchVote.rivalId);
  return (
    <Panel id={id}>
      <PanelHeader>
        Кто выиграет вбрасывание?
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
