import React from 'react';
import Epic from '@vkontakte/vkui/dist/components/Epic/Epic';
import View from '@vkontakte/vkui/dist/components/View/View';
import '@vkontakte/vkui/dist/vkui.css';

import AppBar from './Components/AppBar';
import Home from './Panels/Home';
import Players from './Panels/Players';
import Matches from './Panels/Matches';
import Voting from './Panels/Voting';
import PlayersSelect from './Panels/PlayersSelect';
import Table from './Panels/Table';

class App extends React.Component {

  state = {
    activeStory: 'voting-view',
    activePanelVoting: 'voting',
    activePanelMatches: 'matches',
    activePanelTable: 'table',
    activePanelProfile: 'home',
    activePanelPlayers: 'players',
  };

  onStoryChange = (e) => {
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
      state : {
        activeStory,
        activePanelVoting,
        activePanelMatches,
        activePanelTable,
        activePanelProfile,
        activePanelPlayers,
      },
      onStoryChange,
      goVoting,
      goMatches,
      goTable,
      goPlayers,
      goProfile,
    } = this;

    return (
      <Epic
        activeStory={activeStory}
        tabbar={
          <AppBar
            activeStory={activeStory}
            onStoryChange={onStoryChange}
          />
        }>

        <View id='voting-view' activePanel={activePanelVoting}>
          <Voting id='voting' go={goVoting}/>
          <PlayersSelect id='select-first-five' go={goVoting}/>
          <PlayersSelect id='select-two-score' go={goVoting}/>
          <PlayersSelect id='select-three-score' go={goVoting}/>
        </View>

        <View id='matches-view' activePanel={activePanelMatches}>
          <Matches id='matches' go={goMatches}/>
        </View>

        <View id='table-view' activePanel={activePanelTable}>
          <Table id='table' go={goTable}/>
        </View>

        <View id='players-view' activePanel={activePanelPlayers}>
          <Players id='players' go={goPlayers}/>
        </View>

        <View id='profile-view' activePanel={activePanelProfile}>
          <Home id='home' go={goProfile}/>
        </View>
      </Epic>
    )
  }
}

export default App