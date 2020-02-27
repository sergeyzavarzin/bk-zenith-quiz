import React from 'react';
import {Avatar, Button, Cell, Div, Group, List, PanelSpinner} from '@vkontakte/vkui';

import {withAppContext} from '../../Contexts/AppContext';

const LeaderBoard = ({appContext}) => {
  const {
    state: {
      leaderBoard,
      isLeaderBoardFetching
    }
  } = appContext;

  const handleUpdateButtonClick = () => {
    const {updateLeaderBoard, state} = appContext;
    const {leaderBoard: {nextPage, maxPage}} = state;
    if (nextPage < maxPage) {
      updateLeaderBoard(nextPage)
    }
  };

  return (
    <>
      <Group>
        <List>
          {
            leaderBoard && leaderBoard.data && leaderBoard.data
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
      {
        isLeaderBoardFetching ?
          <PanelSpinner/> :
          <Div style={{marginBottom: 60}}>
            <Button
              size='xl'
              onClick={handleUpdateButtonClick}
            >
              Показать еще
            </Button>
          </Div>
      }
    </>
  )
};

export default withAppContext(LeaderBoard);
