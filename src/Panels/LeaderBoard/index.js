import React from 'react';
import {
  Panel,
  PanelHeader,
  Group,
  List,
  Cell,
  PanelSpinner,
  Avatar,
  Button,
  Div
} from '@vkontakte/vkui';

import {withAppContext} from '../../Contexts/AppContext';

class Table extends React.Component {

  componentDidMount() {
    const {updateLeaderBoard, state} = this.props.appContext;
    if (!state.leaderBoard.data.length) {
      updateLeaderBoard();
    }
  }

  handleUpdateButtonClick = () => {
    const {updateLeaderBoard, state} = this.props.appContext;
    const {leaderBoard: {nextPage, maxPage}} = state;
    if (nextPage < maxPage) {
      updateLeaderBoard(nextPage)
    }
  };

  render() {
    const {id, appContext} = this.props;
    const {featureToggle, state} = appContext;
    const {leaderBoard, isLeaderBoardFetching} = state;
    return (
      <Panel id={id}>
        <PanelHeader>
          Турнирная таблица
        </PanelHeader>
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
          isLeaderBoardFetching && <PanelSpinner/>
        }
        {
          !isLeaderBoardFetching && featureToggle() &&
          <Div style={{marginBottom: 30}}>
            <Button
              size='xl'
              onClick={this.handleUpdateButtonClick}
            >
              Показать еще
            </Button>
          </Div>
        }
      </Panel>
    );
  }
}

export default withAppContext(Table);

