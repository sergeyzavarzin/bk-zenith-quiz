import React from 'react';
import {Epic, ModalCard, ModalRoot, View} from '@vkontakte/vkui';
import Icon56FavoriteOutline from '@vkontakte/icons/dist/56/favorite_outline';
import Icon56CheckCircleOutline from '@vkontakte/icons/dist/56/check_circle_outline';
import Icon56RecentOutline from '@vkontakte/icons/dist/56/recent_outline';
import Icon56NotificationOutline from '@vkontakte/icons/dist/56/notification_outline';
import '@vkontakte/vkui/dist/vkui.css';

import AppBar from '../AppBar';
import Home from '../../Panels/Home';
import Help from '../../Panels/Help';
import HelpView from '../../Panels/Help/HelpView';
import Players from '../../Panels/Players';
import PlayerInfo from '../../Panels/PlayerInfo';
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
import UpdateV2 from '../../Panels/UpdateV2';

import {withAppContext} from '../../Contexts/AppContext';

import {MODALS} from '../../Constants/modals';

import './App.scss';
import PlayOff from '../../Panels/PlayOff';

class App extends React.Component {

  state = {
    activeStory: 'welcome-view',
    activePanelVoting: 'voting',
    activePanelMatches: 'matches',
    activePanelTable: 'table',
    activePanelProfile: 'home',
    activePanelPlayers: 'players',
    activePanelWelcome: 'welcome',
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    const {activeStory} = prevState;
    const {isUserNew, userFlags} = nextProps.appContext.state;
    if (!isUserNew && activeStory === 'welcome-view') {
      if (!userFlags || (userFlags && !userFlags.isUserV2)) {
        return {
          activeStory: 'welcome-view',
          activePanelWelcome: 'update-v-2',
        };
      } else {
        return {
          activeStory: 'voting-view',
        };
      }
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

  modal = () => {
    const {createWallPost, setActiveModal, enableNotifications, state} = this.props.appContext;
    return (
      <ModalRoot activeModal={state.activeModal}>
        <ModalCard
          id={MODALS.REPOST_SUCCESS}
          onClose={() => setActiveModal(null)}
          icon={<Icon56CheckCircleOutline/>}
          title='Отлично!'
          caption='Сохраните репост у себя на стене до окончания голосования. Дополнительный балл будет зачислен после завершения матча.'
          actionsLayout='vertical'
          actions={
            [
              {
                title: 'Ок',
                type: 'primary',
                action: () => setActiveModal(null)
              }
            ]
          }
        />
        <ModalCard
          id={MODALS.INVITE_TO_REPOST}
          onClose={() => setActiveModal(null)}
          icon={<Icon56FavoriteOutline/>}
          title='Заработайте дополнительные баллы'
          caption='Вы можете заработать дополнительный балл поделившись записью на своей стене записью о голосовании за этот матч.'
          actionsLayout='vertical'
          actions={
            [
              {
                title: 'Поделиться',
                type: 'primary',
                action: createWallPost
              },
              {
                title: 'Нет, спасибо',
                type: 'secondary',
                action: () => setActiveModal(null)
              }
            ]
          }
        />
        <ModalCard
          id={MODALS.INVITE_TO_ENABLE_NOTIFICATIONS}
          onClose={() => setActiveModal(null)}
          icon={<Icon56NotificationOutline/>}
          title='Заработайте дополнительные баллы'
          caption='У вас есть возможность включить уведомления чтобы зарабатывать дополнительный балл за каждый матч.'
          actionsLayout='vertical'
          actions={
            [
              {
                title: 'Включить уведомления',
                type: 'primary',
                action: () => enableNotifications(() => setActiveModal(MODALS.INVITE_TO_REPOST))
              },
              {
                title: 'Нет, спасибо',
                type: 'secondary',
                action: () => setActiveModal(MODALS.INVITE_TO_REPOST)
              }
            ]
          }
        />
        <ModalCard
          id={MODALS.NOTIFICATIONS_ARE_DISABLED}
          onClose={() => setActiveModal(null)}
          icon={<Icon56NotificationOutline />}
          title='Уведомления отключены'
          caption='Не забывыйте, что пользователи включившие уведомления получают дополнительный балл за каждое голосование.'
          actionsLayout='vertical'
          actions={
            [
              {
                title: 'Понятно',
                type: 'primary',
                action: () => setActiveModal(null)
              }
            ]
          }
        />
        <ModalCard
          id={MODALS.NOTIFICATIONS_ARE_ENABLED}
          onClose={() => setActiveModal(null)}
          icon={<Icon56NotificationOutline width={56}/>}
          title='Уведомления включены'
          caption='Теперь вам будет начисляться дополнительный балл за каждое голосование.'
          actionsLayout='vertical'
          actions={
            [
              {
                title: 'Отлично!',
                type: 'primary',
                action: () => setActiveModal(null)
              }
            ]
          }
        />
        <ModalCard
          id={MODALS.VOTING_IS_ENDED}
          onClose={() => setActiveModal(null)}
          icon={<Icon56RecentOutline/>}
          title='Голосование завершено'
          caption='К сожалению, вы не успели отправить ответ.'
          actionsLayout='vertical'
          actions={
            [
              {
                title: 'Ок',
                type: 'primary',
                action: () => setActiveModal(null)
              }
            ]
          }
        />
      </ModalRoot>
    )
  };

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
    const modal = this.modal();
    const {
      activeStory, activePanelVoting, activePanelMatches,
      activePanelTable, activePanelProfile, activePanelPlayers,
      activePanelWelcome,
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
        <View id='voting-view' activePanel={activePanelVoting} modal={modal}>
          <Voting
            id='voting'
            go={goVoting}
            changeStory={onStoryChange}
          />
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
          <MatchView withAnswers id='match-view' go={goVoting} prevScreen='voting'/>
        </View>

        <View id='matches-view' activePanel={activePanelMatches}>
          <Matches id='matches' go={goMatches}/>
          <MatchView id='match-view' go={goMatches} prevScreen='matches'/>
        </View>

        <View id='table-view' activePanel={activePanelTable}>
          <Table id='table' go={goTable}/>
          <PlayOff id='play-off' go={goTable}/>
        </View>

        <View id='players-view' activePanel={activePanelPlayers}>
          <Players id='players' go={goPlayers}/>
          <PlayerInfo id='player-info' go={goPlayers}/>
        </View>

        <View id='profile-view' activePanel={activePanelProfile} modal={modal}>
          <Home id='home' go={goProfile}/>
          <Help id='help' go={goProfile}/>
          <HelpView id='help-answer' go={goProfile}/>
          <Market id='market' go={goProfile}/>
          <Purchases id='purchases' go={goProfile}/>
          <Order id='order' go={goProfile}/>
          <OrderInfo id='order-info' go={goProfile}/>
          <Settings id='settings' go={goProfile}/>
        </View>

        <View id='welcome-view' activePanel={activePanelWelcome}>
          <Welcome
            id='welcome'
            startApp={() => this.setState({activeStory: 'voting-view'})}
          />
          <UpdateV2
            id='update-v-2'
            startApp={() => this.setState({activeStory: 'voting-view'})}
          />
        </View>
      </Epic>
    )
  }
}

export default withAppContext(App);
