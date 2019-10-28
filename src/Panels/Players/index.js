import React from 'react';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';
import Group from '@vkontakte/vkui/dist/components/Group/Group';
import List from '@vkontakte/vkui/dist/components/List/List';
import Cell from '@vkontakte/vkui/dist/components/Cell/Cell';
import Avatar from '@vkontakte/vkui/dist/components/Avatar/Avatar';

import Jersey from '../../Components/Jersey';

import players from '../../constants/players';

const Players = ({id, go}) => {
  return (
    <Panel id={id}>
      <PanelHeader>
        Игроки
      </PanelHeader>
      <Group title="Команда БК Зенит">
        <List>
          {
            players
              .sort((a, b) => a.number < b.number ?  -1 : 1)
              .map(player =>
              <Cell
                key={player.id}
                before={<Avatar size={72} src={player.photo}/>}
                size="l"
                description={player.role}
                asideContent={<Jersey number={player.number}/>}
                bottomContent={
                  <div style={{ display: 'flex' }}>
                    <span style={{ margin: '0 15px 0 0' }}>Рост: {player.height}</span>
                    <span>Вес: {player.weight}</span>
                  </div>
                }
              >
                {player.name}
              </Cell>
            )
          }
        </List>
      </Group>
    </Panel>
  );
};

export default Players;

