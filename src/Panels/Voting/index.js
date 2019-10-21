import React from 'react';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';
import Group from '@vkontakte/vkui/dist/components/Group/Group';
import SelectMimicry from '@vkontakte/vkui/dist/components/SelectMimicry/SelectMimicry';
import FormLayout from '@vkontakte/vkui/dist/components/FormLayout/FormLayout';
import FormLayoutGroup from '@vkontakte/vkui/dist/components/FormLayoutGroup/FormLayoutGroup';
import Input from '@vkontakte/vkui/dist/components/Input/Input';
import List from '@vkontakte/vkui/dist/components/List/List';
import Radio from '@vkontakte/vkui/dist/components/Radio/Radio';
import Button from '@vkontakte/vkui/dist/components/Button/Button';
import {Div} from '@vkontakte/vkui';
import matches from '../../mocks/matches';
import Cell from '@vkontakte/vkui/dist/components/Cell/Cell';
import MatchItem from '../../Components/Match';

class Voting extends React.Component {

  state = {
    firstFive: [],
    tossing: null,
    twoScore: null,
    threeScore: null,
    winner: null,
    score: [null, null],
  };

  render() {
    const { firstFive, twoScore, threeScore } = this.state;
    const { id, go } = this.props;
    return (
      <Panel id={id}>
        <PanelHeader>
          Голосование
        </PanelHeader>
        <Group title="Предстоящий матч">
          <List>
            {
              <Cell
                size="l"
              >
                <MatchItem
                  rival={matches[0].rival}
                  beginTime={matches[0].beginTime}
                  place={matches[0].place}
                />
              </Cell>
            }
          </List>
        </Group>
        <Group title="Стартовая пятерка?">
          <FormLayout>
            <SelectMimicry
              top='Выберите игроков'
              placeholder='Не выбрано...'
              data-to='select-first-five'
              onClick={go}
            >
              {firstFive.length && firstFive}
            </SelectMimicry>
          </FormLayout>
        </Group>
        <Group title="Кто выиграет взбрасывание?">
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
        </Group>
        <Group title="Кто первый забьет 2 очка?">
          <FormLayout>
            <SelectMimicry
              top='Выберите игрока'
              placeholder='Не выбрано...'
              data-to='select-two-score'
              onClick={go}
            >
              {twoScore && twoScore}
            </SelectMimicry>
          </FormLayout>
        </Group>
        <Group title="Кто первый забьет 3 очка?">
          <FormLayout>
            <SelectMimicry
              top='Выберите игрока'
              placeholder='Не выбрано...'
              data-to='select-three-score'
              onClick={go}
            >
              {threeScore && threeScore}
            </SelectMimicry>
          </FormLayout>
        </Group>
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
        </Group>
        <Group title="Точный счет?">
          <FormLayout>
            <FormLayoutGroup top="Зенит">
              <Input type="number" min={0}/>
            </FormLayoutGroup>
            <FormLayoutGroup top="Соперник">
              <Input type="number" min={0}/>
            </FormLayoutGroup>
          </FormLayout>
        </Group>
        <Div style={{background: 'white'}}>
          <Button size="xl">
            Отправить ответ
          </Button>
        </Div>
      </Panel>
    )
  }
}

export default Voting