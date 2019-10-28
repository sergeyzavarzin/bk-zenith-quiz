import React from 'react';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';
import Group from '@vkontakte/vkui/dist/components/Group/Group';
import FormLayout from '@vkontakte/vkui/dist/components/FormLayout/FormLayout';
import FormLayoutGroup from '@vkontakte/vkui/dist/components/FormLayoutGroup/FormLayoutGroup';
import Input from '@vkontakte/vkui/dist/components/Input/Input';
import Button from '@vkontakte/vkui/dist/components/Button/Button';
import {Div} from '@vkontakte/vkui';
import FixedLayout from '@vkontakte/vkui/dist/components/FixedLayout/FixedLayout';

const TotalScore = ({id, go}) => {
  return (
    <Panel id={id}>
      <PanelHeader>
        Голосование
      </PanelHeader>
      <Group title="Точный счет?">
        <FormLayout>
          <FormLayoutGroup top="Зенит">
            <Input type="number" min={0}/>
          </FormLayoutGroup>
          <FormLayoutGroup top="Соперник">
            <Input type="number" min={0}/>
          </FormLayoutGroup>
        </FormLayout>
        <FixedLayout vertical="bottom">
          <Group>
            <FormLayout>
              <Button
                size="xl"
                data-to='voting'
                onClick={go}
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

export default TotalScore;