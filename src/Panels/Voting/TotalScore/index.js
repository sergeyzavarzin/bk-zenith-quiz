import React from 'react';
import {FixedLayout, Button, Input, FormLayoutGroup, FormLayout, Group, PanelHeader, Panel} from '@vkontakte/vkui';
import Icon24Back from '@vkontakte/icons/dist/24/back';

import {withAppContext} from '../../../Contexts/AppContext';
import HeaderButton from '@vkontakte/vkui/dist/components/HeaderButton/HeaderButton';

const TotalScore = ({id, go, appContext}) => {
  const {setRivalScore, setClubScore, sendVote, state} = appContext;
  const {activeMatchVote, rivals, clubScore, rivalScore} = state;
  const currentRival = rivals && activeMatchVote && rivals.find(rival => rival.id === activeMatchVote.rivalId);
  return (
    <Panel id={id}>
      <PanelHeader
        left={
          <HeaderButton
            data-to='select-winner'
            onClick={go}
          >
            <Icon24Back/>
          </HeaderButton>
        }
      >
        Голосование
      </PanelHeader>
      <Group title="Точный счет?">
        <FormLayout>
          <FormLayoutGroup top="Зенит">
            <Input
              type="number"
              onChange={({target: {value}}) => setClubScore(value)}
            />
          </FormLayoutGroup>
          <FormLayoutGroup top={currentRival.name}>
            <Input
              type="number"
              onChange={({target: {value}}) => setRivalScore(value)}
            />
          </FormLayoutGroup>
        </FormLayout>
        <FixedLayout vertical="bottom">
          <Group>
            <FormLayout>
              <Button
                style={(clubScore && rivalScore) ? {} : {
                  opacity: 0.5,
                  pointerEvents: 'none',
                  userSelect: 'none',
                }}
                size="xl"
                data-to='thanks'
                onClick={(e) => {
                  sendVote();
                  go(e);
                }}
              >
                Отправить
              </Button>
            </FormLayout>
          </Group>
        </FixedLayout>
      </Group>
    </Panel>
  )
};

export default withAppContext(TotalScore);
