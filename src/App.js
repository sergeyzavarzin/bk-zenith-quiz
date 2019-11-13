import React from 'react';
import Epic from '@vkontakte/vkui/dist/components/Epic/Epic';
import View from '@vkontakte/vkui/dist/components/View/View';
import '@vkontakte/vkui/dist/vkui.css';

import AppBar from './Components/AppBar';
import Home from './Panels/Home';
import Help from './Panels/Help';
import HelpView from './Panels/Help/HelpView';
import Players from './Panels/Players';
import Matches from './Panels/Matches';
import MatchView from './Panels/MatchResults';
import PlayersSelect from './Panels/Voting/PlayersSelect';
import Table from './Panels/LeaderBoard';
import Market from './Panels/Market';
import Tossing from './Panels/Voting/Tossing';
import Winner from './Panels/Voting/Winner';
import TotalScore from './Panels/Voting/TotalScore';
import Thanks from './Panels/Voting/Thanks';
import Welcome from './Panels/Welcome';

import {withAppContext} from './context/AppContext';

import './App.scss';

class App extends React.Component {

  state = {
    user: null,
    activeStory: 'welcome-view',
    activePanelStore: 'market',
    activePanelMatches: 'matches',
    activePanelTable: 'table',
    activePanelProfile: 'home',
    activePanelPlayers: 'players',
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (!nextProps.context.state.isUserNew && prevState.activeStory === 'welcome-view') {
      return {
        activeStory: 'market-view',
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

  goStore= e => this.go('activePanelStore')(e);
  goMatches = e => this.go('activePanelMatches')(e);
  goProfile = e => this.go('activePanelProfile')(e);
  goPlayers = e => this.go('activePanelPlayers')(e);
  goTable = e => this.go('activePanelTable')(e);

  render() {
    const {
      state,
      props,
      onStoryChange,
      goStore,
      goMatches,
      goTable,
      goPlayers,
      goProfile,
    } = this;

    const {
      activeStory, activePanelStore, activePanelMatches,
      activePanelTable, activePanelProfile, activePanelPlayers,
    } = state;

    const {
      state: {firstFive, twoScore, threeScore, user, userScore},
      addPlayerToFirstFive, setTwoScore, setThreeScore,
    } = props.context;

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
        <View id='market-view' activePanel={activePanelStore}>
          <Market id='market' go={goStore} changeStory={onStoryChange}/>
        </View>

        <View id='matches-view' activePanel={activePanelMatches}>
          <Matches id='matches' go={goMatches}/>
          <MatchView id='match-view' go={goMatches}/>

          <PlayersSelect
            id='select-first-five'
            go={goMatches}
            nextScreen='select-tossing'
            label='Угадайте стартовую пятерку'
            title='Выберите игроков'
            handleItemSelect={addPlayerToFirstFive}
            isSelected={(id) => firstFive.includes(id)}
            isButtonDisabled={firstFive.length === 5}
          />
          <PlayersSelect
            id='select-two-score'
            go={goMatches}
            nextScreen='select-three-score'
            label='Кто первым забьет двухочковый?'
            title='Выберите игрока'
            handleItemSelect={setTwoScore}
            isSelected={(id) => id === twoScore}
            isButtonDisabled={!!twoScore}
          />
          <PlayersSelect
            id='select-three-score'
            go={goMatches}
            nextScreen='select-winner'
            label='Кто первым забьет трехочковый?'
            title='Выберите игрока'
            handleItemSelect={setThreeScore}
            isSelected={(id) => id === threeScore}
            isButtonDisabled={!!threeScore}
          />
          <Tossing id='select-tossing' go={goMatches}/>
          <Winner id='select-winner' go={goMatches}/>
          <TotalScore id='select-total-score' go={goMatches}/>
          <Thanks id='thanks' go={goMatches}/>
        </View>

        <View id='table-view' activePanel={activePanelTable}>
          <Table id='table' go={goTable}/>
        </View>

        <View id='players-view' activePanel={activePanelPlayers}>
          <Players id='players' go={goPlayers}/>
        </View>

        <View id='profile-view' activePanel={activePanelProfile}>
          <Home id='home' go={goProfile} fetchedUser={user} userScore={userScore}/>
          <Help id='help' go={goProfile}/>
          <HelpView id='help-answer' go={goProfile}/>
        </View>

        <View id='welcome-view' activePanel='welcome'>
          <Welcome
            id='welcome'
            startApp={() => this.setState({activeStory: 'matches-view'})}
          />
        </View>
      </Epic>
    )
  }
}

export default withAppContext(App);
