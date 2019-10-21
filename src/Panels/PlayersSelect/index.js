import React from 'react';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';
import Group from '@vkontakte/vkui/dist/components/Group/Group';
import List from '@vkontakte/vkui/dist/components/List/List';
import Cell from '@vkontakte/vkui/dist/components/Cell/Cell';
import HeaderButton from '@vkontakte/vkui/dist/components/HeaderButton/HeaderButton';
import FixedLayout from '@vkontakte/vkui/dist/components/FixedLayout/FixedLayout';
import Button from '@vkontakte/vkui/dist/components/Button/Button';
import Icon24Back from '@vkontakte/icons/dist/24/back';
import Avatar from '@vkontakte/vkui/dist/components/Avatar/Avatar';
import Counter from '@vkontakte/vkui/dist/components/Counter/Counter';
import {Div} from '@vkontakte/vkui';

import players from '../../constants/players';

class PlayesrsSelect extends React.Component {

  state = {
    selectedPlayers: [],
  };

  render() {
    const { id, go } = this.props;
    return (
      <Panel id={id}>
        <PanelHeader
          left={
            <HeaderButton
              data-to='voting'
              onClick={go}
            >
              <Icon24Back/>
            </HeaderButton>}
        >
          {
            id === 'select-first-five' ?
              'Выберите 5 игроков' : 'Выберите игрока'
          }
        </PanelHeader>
        <Group title="Стартовая пятерка?">
          <List>
            {
              players.map(player =>
                <Cell
                  key={player.id}
                  before={<Avatar size={42} src={player.photo}/>}
                  selectable
                  description={player.role}
                  asideContent={<Counter type="primary">{player.number}</Counter>}
                  onClick={() => console.log(231)}
                >
                  {player.name}
                </Cell>
              )
            }
          </List>
        </Group>
        <FixedLayout vertical="bottom">
          <Div style={{background: 'white'}}>
            <Button
              size="xl"
              data-to='voting'
              onClick={go}
            >
              Выбрать
            </Button>
          </Div>
        </FixedLayout>
      </Panel>
    )
  }
}

export default PlayesrsSelect;