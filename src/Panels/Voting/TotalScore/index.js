import React from 'react';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';
import Group from '@vkontakte/vkui/dist/components/Group/Group';
import FormLayout from '@vkontakte/vkui/dist/components/FormLayout/FormLayout';
import FormLayoutGroup from '@vkontakte/vkui/dist/components/FormLayoutGroup/FormLayoutGroup';
import Input from '@vkontakte/vkui/dist/components/Input/Input';
import Button from '@vkontakte/vkui/dist/components/Button/Button';
import FixedLayout from '@vkontakte/vkui/dist/components/FixedLayout/FixedLayout';
import {withAppContext} from '../../../context/AppContext';

const TotalScore = ({id, go, context}) => {
  const {setRivalScore, setClubScore, sendVote, state} = context;
  const {activeMatchVote, rivals} = state;
  return (
    <Panel id={id}>
      <PanelHeader>
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
          <FormLayoutGroup top={rivals && rivals.find(rival => rival.id === activeMatchVote.rivalId).name}>
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
                size="xl"
                data-to='voting'
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
