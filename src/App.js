import React from 'react';
import Epic from '@vkontakte/vkui/dist/components/Epic/Epic';
import View from '@vkontakte/vkui/dist/components/View/View';
import connect from '@vkontakte/vk-connect';
import '@vkontakte/vkui/dist/vkui.css';

import AppBar from './Components/AppBar';
import Home from './Panels/Home';
import Players from './Panels/Players';
import Matches from './Panels/Matches';
import PlayersSelect from './Panels/PlayersSelect';
import Table from './Panels/Table';
import Voting from './Panels/Voting';
import Tossing from './Panels/Voting/Tossing';
import Winner from './Panels/Voting/Winner';
import TotalScore from './Panels/Voting/TotalScore';
import {withAppContext} from './context/AppContext';

class App extends React.Component {

  state = {
    user: null,
    activeStory: 'voting-view',
    activePanelVoting: 'voting',
    activePanelMatches: 'matches',
    activePanelTable: 'table',
    activePanelProfile: 'home',
    activePanelPlayers: 'players',
  };

  componentDidMount() {
    connect.subscribe(({ detail: { type, data }}) => {
      if (type === 'VKWebAppUpdateConfig') {
        const schemeAttribute = document.createAttribute('scheme');
        schemeAttribute.value = data.scheme ? data.scheme : 'client_light';
        document.body.attributes.setNamedItem(schemeAttribute);
      }
    });
    this.fetchUserData()
      .then(user => this.setState({user}))
      .catch(err => console.log(err));
  }

  fetchUserData = async () => {
    const user = await connect.sendPromise('VKWebAppGetUserInfo');
    return user;
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
        user,
      },
      props: {
        context: {
          state: {
            firstFive,
            twoScore,
            threeScore
          },
          addPlayerToFirstFive,
          setTwoScore,
          setThreeScore,
        },
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
          <PlayersSelect
            id='select-first-five'
            go={goVoting}
            nextScreen='select-tossing'
            label='Угадайте стартовую пятерку'
            title='Выберите игроков'
            handleItemSelect={addPlayerToFirstFive}
            isSelected={(id) => firstFive.includes(id)}
          />
          <PlayersSelect
            id='select-two-score'
            go={goVoting}
            nextScreen='select-three-score'
            label='Кто первым забьет двухочковый?'
            title='Выберите игрока'
            handleItemSelect={setTwoScore}
            isSelected={(id) => id === twoScore}
          />
          <PlayersSelect
            id='select-three-score'
            go={goVoting}
            nextScreen='select-winner'
            label='Кто первым забьет трехочковый?'
            title='Выберите игрока'
            handleItemSelect={setThreeScore}
            isSelected={(id) => id === threeScore}
          />
          <Tossing id='select-tossing' go={goVoting}/>
          <Winner id='select-winner' go={goVoting}/>
          <TotalScore id='select-total-score' go={goVoting}/>
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
          <Home id='home' go={goProfile} fetchedUser={user}/>
        </View>
      </Epic>
    )
  }
}

export default withAppContext(App);