import React from 'react';
import {Div, Panel, PanelHeader, Group, FormLayout, Radio, Button, FixedLayout} from '@vkontakte/vkui';
import Icon24Back from '@vkontakte/icons/dist/24/back';

import {withAppContext} from '../../../Contexts/AppContext';

import Zenith from '../../../Images/zenith.png';
import HeaderButton from '@vkontakte/vkui/dist/components/HeaderButton/HeaderButton';

const Winner = ({id, go, appContext}) => {
  const {setWinner, state} = appContext;
  const {rivals, activeMatchVote, winner} = state;
  const currentRival = rivals && activeMatchVote && rivals.find(rival => rival.id === activeMatchVote.rivalId);
  return (
    <Panel id={id}>
      <PanelHeader
        left={
          <HeaderButton
            data-to='select-three-score'
            onClick={go}
          >
            <Icon24Back/>
          </HeaderButton>
        }
      >
        Кто выиграет матч?
      </PanelHeader>
      <Group title="Кто выиграет матч?">
        <FormLayout>
          <Radio
            name="radio"
            onClick={() => setWinner(1)}
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
            onClick={() => setWinner(2)}
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
                style={winner ? {} : {
                  opacity: 0.5,
                  pointerEvents: 'none',
                  userSelect: 'none',
                }}
                size="xl"
                data-to='select-total-score'
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

export default withAppContext(Winner);
