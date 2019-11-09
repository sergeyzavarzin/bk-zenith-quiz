import React from 'react';
import {Avatar, Cell, List, Group, Panel, PanelHeader} from '@vkontakte/vkui';

import Jersey from '../../Components/Jersey';

import players from '../../constants/players';

const Players = ({id}) => {
  return (
    <Panel id={id}>
      <PanelHeader>
        Игроки
      </PanelHeader>
      <Group title="Команда">
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
                <b>{player.name}</b>
              </Cell>
            )
          }
        </List>
      </Group>
    </Panel>
  );
};

export default Players;

