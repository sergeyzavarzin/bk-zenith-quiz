import React from 'react';
import {
  Panel, PanelHeader, Tabs,
  TabsItem, FixedLayout
} from '@vkontakte/vkui';

import {withAppContext} from '../../Contexts/AppContext';
import PlayOff from '../../Components/PlayOff';
import LeaderBoard from '../../Components/LeaderBoard';

class Table extends React.Component {

  componentDidMount() {
    const {updateLeaderBoard, state} = this.props.appContext;
    if (!state.leaderBoard.data.length) {
      updateLeaderBoard();
    }
  }

  render() {
    const {id, appContext, go} = this.props;
    const {state: {leaderBoardSelectedTab}, setValue, featureToggle} = appContext;
    return (
      <Panel id={id}>
        <PanelHeader>
          Турнирная таблица
        </PanelHeader>
        {
          leaderBoardSelectedTab === 'leaderboard' ?
            <LeaderBoard/> : <PlayOff go={go}/>
        }
        {
          featureToggle() &&
          <FixedLayout vertical='bottom'>
            <Tabs type='default'>
              <TabsItem
                onClick={() => setValue('leaderBoardSelectedTab')('leaderboard')}
                selected={leaderBoardSelectedTab === 'leaderboard'}
              >
                Турнирная таблица
              </TabsItem>
              <TabsItem
                onClick={() => setValue('leaderBoardSelectedTab')('playoff')}
                selected={leaderBoardSelectedTab === 'playoff'}
              >
                Плей-офф
              </TabsItem>
            </Tabs>
          </FixedLayout>
        }
      </Panel>
    );
  }
}

export default withAppContext(Table);

