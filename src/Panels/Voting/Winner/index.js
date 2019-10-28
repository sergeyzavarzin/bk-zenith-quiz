import React from 'react';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';
import Group from '@vkontakte/vkui/dist/components/Group/Group';
import FormLayout from '@vkontakte/vkui/dist/components/FormLayout/FormLayout';
import Radio from '@vkontakte/vkui/dist/components/Radio/Radio';
import Button from '@vkontakte/vkui/dist/components/Button/Button';
import {Div} from '@vkontakte/vkui';
import FixedLayout from '@vkontakte/vkui/dist/components/FixedLayout/FixedLayout';

const Winner = ({id, go}) => {
  return (
    <Panel id={id}>
      <PanelHeader>
        Голосование
      </PanelHeader>
      <Group title="Кто выиграет матч?">
        <FormLayout>
          <Radio
            name="radio"
            value="1"
            defaultChecked
          >
            Зенит
          </Radio>
          <Radio name="radio" value="2">
            Соперник
          </Radio>
        </FormLayout>
        <FixedLayout vertical="bottom">
          <Group>
            <FormLayout>
              <Button
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

export default Winner;