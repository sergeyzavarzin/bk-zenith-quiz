import React from 'react';
import {
  Panel,
  PanelHeader,
  Group,
  List,
  Cell,
  PullToRefresh,
  Avatar,
} from '@vkontakte/vkui';

import {withAppContext} from '../../context/AppContext';

class Table extends React.Component {
  render() {
    const {id, context} = this.props;
    const {
      state: {
        leaderboard,
        isLeaderBoardLoaded
      },
      updateLeaderBoard
    } = context;
    return (
      <Panel id={id}>
        <PanelHeader>
          Турнирная таблица
        </PanelHeader>
        <PullToRefresh
          onRefresh={updateLeaderBoard}
          isFetching={isLeaderBoardLoaded}
        >
          <Group title={`Топ 10 голосующих`}>
            <List>
              {
                leaderboard
                  .sort((a, b) => a.score > b.score ? -1 : 1)
                  .map(item =>
                    <Cell
                      key={item.id}
                      before={<Avatar size={42} src={item.img}/>}
                      size="m"
                      asideContent={`${item.score} очков`}
                    >
                      {item.name}
                    </Cell>
                  )
              }
            </List>
          </Group>
        </PullToRefresh>
      </Panel>
    );
  }
}

export default withAppContext(Table);

