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

import {withAppContext} from '../../Contexts/AppContext';

class Table extends React.Component {
  render() {
    const {id, appContext} = this.props;
    const {
      state: {
        leaderboard,
        isLeaderBoardLoaded
      },
      updateLeaderBoard
    } = appContext;
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
                  .sort((a, b) => a.totalScore > b.totalScore ? -1 : 1)
                  .map(item =>
                    <Cell
                      key={item._id}
                      before={<Avatar size={42} src={item.img}/>}
                      size="m"
                      asideContent={`${item.totalScore} очков`}
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

