import React from 'react';
import {
  Panel,
  PanelHeader,
  Group,
  List,
  Cell,
  PanelSpinner,
  Avatar,
} from '@vkontakte/vkui';

import {withAppContext} from '../../Contexts/AppContext';

class Table extends React.Component {

  componentDidMount() {
    const {updateLeaderBoard, state, featureToggle} = this.props.appContext;
    if (featureToggle()) {
      window.addEventListener('scroll', this.handleScroll);
    }
    if (!state.leaderBoard.data.length) {
      updateLeaderBoard();
    }
  }

  componentWillUnmount() {
    const {featureToggle} = this.props.appContext;
    if (featureToggle()) {
      window.removeEventListener('scroll', this.handleScroll);
    }
  }

  handleScroll = e => {
    const {updateLeaderBoard, state} = this.props.appContext;
    const {leaderBoard: {nextPage, maxPage}} = state;
    const {scrollTop, offsetHeight, scrollHeight} = e.target.documentElement;
    const scrollBottom = scrollTop + offsetHeight >= scrollHeight;
    if (scrollBottom && nextPage < maxPage) {
      updateLeaderBoard(nextPage)
    }
  };

  render() {
    const {id, appContext} = this.props;
    const {leaderBoard, isLeaderBoardFetching} = appContext.state;
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
      </Panel>
    );
  }
}

export default withAppContext(Table);

