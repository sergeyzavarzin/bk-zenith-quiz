import React from 'react';
import {Epic, View} from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';

import AppBar from '../AppBar';
import Home from '../../Panels/Home';
import Help from '../../Panels/Help';
import HelpView from '../../Panels/Help/HelpView';
import Players from '../../Panels/Players';
import Voting from '../../Panels/Voting';
import Matches from '../../Panels/Matches';
import MatchView from '../../Panels/MatchResults';
import PlayersSelect from '../../Panels/Voting/PlayersSelect';
import Table from '../../Panels/LeaderBoard';
import Market from '../../Panels/Market';
import Tossing from '../../Panels/Voting/Tossing';
import Winner from '../../Panels/Voting/Winner';
import TotalScore from '../../Panels/Voting/TotalScore';
import Thanks from '../../Panels/Voting/Thanks';
import Welcome from '../../Panels/Welcome';
import Purchases from '../../Panels/Purchases';
import Order from '../../Panels/Order';
import OrderInfo from '../../Panels/OrderInfo';
import Settings from '../../Panels/Settings';

import {withAppContext} from '../../Contexts/AppContext';

import './App.scss';

class App extends React.Component {

  state = {
    user: null,
    activeStory: 'welcome-view',
    activePanelVoting: 'voting',
    activePanelMatches: 'matches',
    activePanelTable: 'table',
    activePanelProfile: 'home',
    activePanelPlayers: 'players',
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (!nextProps.appContext.state.isUserNew && prevState.activeStory === 'welcome-view') {
      return {
        activeStory: 'voting-view',
      };
    }
    return null;
  }

  onStoryChange = e => {
    this.setState({
      activeStory: e.currentTarget.dataset.story
    })
  };

  go = story => e => this.setState({
    [story]: e.currentTarget.dataset.to
  });

  goVoting = e => this.go('activePanelVoting')(e);
  goMatches = e => this.go('activePanelMatches')(e);
  goProfile = e => this.go('activePanelProfile')(e);
  goPlayers = e => this.go('activePanelPlayers')(e);
  goTable = e => this.go('activePanelTable')(e);

  render() {
    const {
      state, props,
      onStoryChange,
      goVoting,
      goMatches,
      goTable,
      goPlayers,
      goProfile,
    } = this;
    const {
      activeStory, activePanelVoting, activePanelMatches,
      activePanelTable, activePanelProfile, activePanelPlayers,
    } = state;
    const {
      state: {firstFive, twoScore, threeScore},
      addPlayerToFirstFive, setTwoScore, setThreeScore,
    } = props.appContext;
    const isVisibleAppBar = !['welcome-view'].includes(activeStory);
    return (
      <Epic
        activeStory={activeStory}
        tabbar={
          isVisibleAppBar && <AppBar
            activeStory={activeStory}
            onStoryChange={onStoryChange}
          />
        }
      >
        <View id='voting-view' activePanel={activePanelVoting}>
          <Voting id='voting' go={goVoting} changeStory={onStoryChange}/>
          <PlayersSelect
            id='select-first-five'
            go={goVoting}
            nextScreen='select-tossing'
            prevScreen='voting'
            label='Вопрос 1 / 6'
            title='Выберите игроков'
            handleItemSelect={addPlayerToFirstFive}
            selectedCount={firstFive.length}
            isSelected={id => firstFive.includes(id)}
            isButtonDisabled={firstFive.length === 5}
            question='Выберите стартовую пятерку'
          />
          <PlayersSelect
            id='select-two-score'
            go={goVoting}
            nextScreen='select-three-score'
            prevScreen='select-tossing'
            label='Вопрос 3 / 6'
            title='Выберите игрока'
            handleItemSelect={setTwoScore}
            isSelected={id => id === twoScore}
            isButtonDisabled={!!twoScore}
            question='Кто первым забьет двухочковый?'
          />
          <PlayersSelect
            id='select-three-score'
            go={goVoting}
            nextScreen='select-winner'
            prevScreen='select-two-score'
            label='Вопрос 4 / 6'
            title='Выберите игрока'
            handleItemSelect={setThreeScore}
            isSelected={id => id === threeScore}
            isButtonDisabled={!!threeScore}
            question='Кто первым забьет трехочковый?'
          />
          <Tossing id='select-tossing' go={goVoting}/>
          <Winner id='select-winner' go={goVoting}/>
          <TotalScore id='select-total-score' go={goVoting}/>
          <Thanks id='thanks' go={goVoting}/>
        </View>

        <View id='matches-view' activePanel={activePanelMatches}>
          <Matches id='matches' go={goMatches}/>
          <MatchView id='match-view' go={goMatches}/>
        </View>

        <View id='table-view' activePanel={activePanelTable}>
          <Table id='table' go={goTable}/>
        </View>

        <View id='players-view' activePanel={activePanelPlayers}>
          <Players id='players' go={goPlayers}/>
        </View>

        <View id='profile-view' activePanel={activePanelProfile}>
          <Home id='home' go={goProfile}/>
          <Help id='help' go={goProfile}/>
          <HelpView id='help-answer' go={goProfile}/>
          <Market id='market' go={goProfile}/>
          <Purchases id='purchases' go={goProfile}/>
          <Order id='order' go={goProfile}/>
          <OrderInfo id='order-info' go={goProfile}/>
          <Settings id='settings' go={goProfile}/>
        </View>

        <View id='welcome-view' activePanel='welcome'>
          <Welcome
            id='welcome'
            startApp={() => this.setState({activeStory: 'voting-view'})}
          />
        </View>
      </Epic>
    )
  }
}

export default withAppContext(App);
