import React from 'react';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';
import Group from '@vkontakte/vkui/dist/components/Group/Group';
import FormLayout from '@vkontakte/vkui/dist/components/FormLayout/FormLayout';
import Radio from '@vkontakte/vkui/dist/components/Radio/Radio';
import Button from '@vkontakte/vkui/dist/components/Button/Button';
import FixedLayout from '@vkontakte/vkui/dist/components/FixedLayout/FixedLayout';
import {withAppContext} from '../../../context/AppContext';

const Tossing = ({id, go, context}) => {
  const {setTossing, state} = context;
  const {rivals, activeMatchVote} = state;
  return (
    <Panel id={id}>
      <PanelHeader>
        Кто выиграет вбрасывание?
      </PanelHeader>
      <Group title="Кто выиграет вбрасывание?">
        <FormLayout>
          <Radio
            name="radio"
            defaultChecked
            onClick={() => setTossing(1)}
          >
            Зенит
          </Radio>
          <Radio
            name="radio"
            onClick={() => setTossing(2)}
          >
            {rivals && activeMatchVote && rivals.find(rival => rival.id === activeMatchVote.rivalId).name}
          </Radio>
        </FormLayout>
        <FixedLayout vertical="bottom">
          <Group>
            <FormLayout>
              <Button
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
