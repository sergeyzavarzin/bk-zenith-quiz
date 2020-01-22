import React, {Component} from 'react';
import moment from 'moment';
import axios from 'axios';
import connectOnline from '@vkontakte/vk-connect';
import connectMock from '@vkontakte/vk-connect-mock';

import {API_URL} from '../../Constants/endpoints';
import {MODALS} from '../../Constants/modals';
import players from '../../Constants/players';

import {queryParams} from '../../Utils/queryParams';
import {getUrlParams} from '../../Utils/getUrlParams';

const connect = process.env.NODE_ENV === 'development' ? connectMock : connectOnline;

export const AppContext = React.createContext(true);

class AppContextProvider extends Component {

  state = {
    activeModal: null,
    isAppDataFetching: false,
    isLeaderBoardFetching: false,
    isMatchesFetching: false,
    isUserDataFetching: false,
    isUserNew: true,
    user: null,
    userScore: 0,
    userTotalScore: 0,
    position: null,
    leaderBoard: {data: [], nextPage: 0, maxPage: 2},
    rivals: [],
    matches: [],
    userVotes: [],
    activeMatchVote: null,
    activeMatch: null,
    firstFive: [],
    twoScore: null,
    threeScore: null,
    tossing: null,
    winner: null,
    clubScore: 0,
    rivalScore: 0,
    isUserCreateRepostForCurrentMatch: false,
    selectedPlayer: null,
    vkParams: null,
  };

  admins = [17188634, 127017464, 2314852, 3918082];

  componentDidMount() {
    this.setState({vkParams: getUrlParams(window.location.search)}, () => console.log(getUrlParams(window.location.search)));
    this.subscribeVKActions();
    this.fetchUserData();
  }

  prepareAppData = userData => {
    Promise
      .all([this.fetchRivals(), this.fetchMatches()])
      .then(async ([rivals, matches]) => {
        const {user, userScore, userTotalScore} = userData;
        const activeMatchVote = this.getActiveMatchVote(matches);
        const isUserCreateRepostForCurrentMatch = await this.fetchUserRepost(activeMatchVote);
        this.setState({
          user, userScore, userTotalScore, rivals,
          matches, activeMatchVote,
          isUserCreateRepostForCurrentMatch,
        });
        return user;
      })
      .then(async user => {
        const userVotes = await this.fetchUserVotes(user.id);
        const position = await this.getUserPosition(user.id);
        this.setState({userVotes, position})
      })
      .catch(err => console.log(err))
      .finally(() => this.setState({isAppDataFetching: true}));
  };

  subscribeVKActions = () => {
    connect.subscribe(({detail: {type, data}}) => {
      if (type === 'VKWebAppUpdateConfig') {
        const schemeAttribute = document.createAttribute('scheme');
        schemeAttribute.value = data.scheme ? data.scheme : 'client_light';
        document.body.attributes.setNamedItem(schemeAttribute);
      }
    });
  };

  fetchUserRepost = async activeMatch => {
    if (!activeMatch) return false;
    const {id: matchId} = activeMatch;
    const {id: userId} = this.state.user;
    const repost = await axios.get(`${API_URL}/repost?${queryParams({matchId, userId})}`);
    return !!repost.data;
  };

  updateUserData = async () => {
    this.setState({isUserDataFetching: true});
    axios
      .get(`${API_URL}/user/${this.state.user.id}`)
      .then(({data: {score, totalScore}}) => this.setState({
        userScore: score,
        userTotalScore: totalScore,
        isUserDataFetching: false,
      }))
      .finally(() => this.setState({isUserDataFetching: false}));
  };

  fetchUserData = async () => {
    const user = await connect.sendPromise('VKWebAppGetUserInfo');
    axios
      .get(`${API_URL}/user/${user.id}`)
      .then(({data}) => this.setState({isUserNew: !data}, () => {
        this.prepareAppData({
          user,
          userScore: data.score,
          userTotalScore: data.totalScore,
        });
      }))
      .finally(() => this.setState({user}));
  };

  createUser = async () => {
    const {user} = this.state;
    const {id, first_name, last_name, photo_100} = user;
    const data = {
      id,
      name: `${first_name} ${last_name}`,
      img: photo_100,
      agreement: true,
      privacy: true,
    };
    axios
      .post(`${API_URL}/user/create`, data)
      .then(({data: {score, totalScore}}) => {
        this.prepareAppData({
          user,
          userScore: score,
          userTotalScore: totalScore,
        })
      });
  };

  getUserPosition = (id = null) => {
    axios
      .get(`${API_URL}/user/position?id=${id || this.state.user.id}`)
      .then(({data: {position}}) => this.setState({position}))
  };

  fetchRivals = async () => {
    const rivals = await axios.get(`${API_URL}/rival`);
    return rivals.data;
  };

  fetchMatches = async () => {
    const matches = await axios.get(`${API_URL}/match`);
    return matches.data;
  };

  fetchUserVotes = async userId => {
    const userVotes = await axios.get(`${API_URL}/vote?playerId=${userId}`);
    return userVotes.data;
  };

  fetchLeaderBoard = async page => {
    const leaderBoard = await axios.get(`${API_URL}/user/leaderboard?page=${page}`);
    return leaderBoard.data;
  };

  updateLeaderBoard = async () => {
    const {leaderBoard: {nextPage}} = this.state;
    this.setState({isLeaderBoardFetching: true});
    const leaderBoard = await this.fetchLeaderBoard(nextPage);
    this.setState(({leaderBoard: {data}}) => {
      return {
        isLeaderBoardFetching: false,
        leaderBoard: {
          data: [...data, ...leaderBoard.data],
          nextPage: leaderBoard.nextPage,
          maxPage: leaderBoard.maxPage
        }
      }
    });
  };

  updateMatches = async () => {
    this.setState({isMatchesFetching: true});
    const matches = await this.fetchMatches();
    const activeMatchVote = this.getActiveMatchVote(matches);
    this.setState({activeMatchVote, matches}, () => this.setState({isMatchesFetching: false}));
  };

  addPlayerToFirstFive = item => {
    const {firstFive} = this.state;
    const selectedPlayers = firstFive.includes(item) ?
      firstFive.filter(playerId => playerId !== item) : [item, ...firstFive];
    if (selectedPlayers.length > 5) return true;
    this.setState({firstFive: selectedPlayers});
  };

  setScore = name => score => {
    if (!(/^\d+$/.test(score))) return false;
    if (score.length) {
      this.setState({[name]: parseInt(score)})
    } else {
      this.setState({[name]: 0});
    }
  };

  getActiveMatchVote = matches => {
    if (!matches.length) return null;
    const sortedMatches = matches
      .filter(match => !match.score.length)
      .sort((a, b) => moment.utc(a.startDateTime).diff(moment.utc(b.startDateTime)));
    const now = moment();
    return sortedMatches.length && moment.duration(now.diff(sortedMatches[0].startDateTime)).asHours() > -25 ?
      sortedMatches[0] : null;
  };

  sendVote = () => {
    const {firstFive, tossing, twoScore, threeScore, clubScore, rivalScore, user, activeMatchVote} = this.state;
    const data = {
      id: `${user.id}-${activeMatchVote.id}`,
      playerId: `${user.id}`,
      matchId: activeMatchVote.id,
      firstFive,
      tossing: tossing === 1,
      twoScore,
      threeScore,
      winner: clubScore > rivalScore,
      score: [clubScore, rivalScore]
    };
    axios
      .post(`${API_URL}/vote/create`, data)
      .then(({data}) => this.setState(prevState => {
        return {userVotes: [data, ...prevState.userVotes]}
      }))
      .catch(err => console.log(err));
  };

  featureToggle = () => this.admins.includes(this.state.user ? this.state.user.id : 123);

  setValue = name => value => this.setState({[name]: value});

  setActiveModal = activeModal => this.setState({activeModal});

  createRepost = postId => {
    const {user: {id: userId}, activeMatchVote: {id: matchId}} = this.state;
    const data = {postId, userId, matchId};
    axios
      .post(`${API_URL}/repost`, data)
      .then(response => console.log(response))
      .catch(error => console.log(error));
  };

  createWallPost = () => {
    const {activeMatchVote, rivals} = this.state;
    const currentRival = !!activeMatchVote && rivals.find(rival => rival.id === activeMatchVote.rivalId);
    const message = `Голосуй за матч с БК «${currentRival.name.trim()}» вместе со мной!\nЗарабатывай баллы и обменивай их на бесплатные билеты, клубную атрибутику и другие ценные призы.`;
    const attachments = 'photo-74457752_457281666,https://vk.com/app7179287_-74457752';
    connect
      .sendPromise('VKWebAppShowWallPostBox', {message, attachments})
      .then(data => {
        this.createRepost(data.post_id);
        this.setState({
          isUserCreateRepostForCurrentMatch: true,
          activeModal: MODALS.REPOST_SUCCESS
        });
      })
      .catch(error => console.log(error));
  };

  enableNotifications = () => connect
    .sendPromise('VKWebAppAllowNotifications')
    .then(() => axios.post(`${API_URL}/notification-list`, {
      user: this.state.user.id,
      status: 1,
    }))
    .catch(error => console.log(error));

  disableNotifications = () => connect
    .sendPromise('VKWebAppDenyNotifications')
    .then(() => axios.post(`${API_URL}/notification-list`, {
      user: this.state.user.id,
      status: 0,
    }))
    .catch(error => console.log(error));

  setVkParams = vkParams => this.setState({vkParams});

  setSelectedPlayer = id => this.setState({selectedPlayer: players.find(player => player.id === id)});

  render() {
    return (
      <AppContext.Provider
        value={{
          state: this.state,
          setActiveModal: this.setActiveModal,
          setValue: this.setValue,
          createUser: this.createUser,
          fetchMatches: this.fetchMatches,
          fetchRivals: this.fetchRivals,
          addPlayerToFirstFive: this.addPlayerToFirstFive,
          sendVote: this.sendVote,
          updateLeaderBoard: this.updateLeaderBoard,
          updateUserData: this.updateUserData,
          updateMatches: this.updateMatches,
          setWinner: winner => this.setState({winner}),
          setTossing: tossing => this.setState({tossing}),
          setTwoScore: twoScore => this.setState({twoScore}),
          setThreeScore: threeScore => this.setState({threeScore}),
          setActiveMatch: activeMatch => this.setState({activeMatch}),
          setClubScore: clubScore => this.setScore('clubScore')(clubScore),
          setRivalScore: rivalScore => this.setScore('rivalScore')(rivalScore),
          featureToggle: this.featureToggle,
          createRepost: this.createRepost,
          createWallPost: this.createWallPost,
          setSelectedPlayer: this.setSelectedPlayer,
          enableNotifications: this.enableNotifications,
          disableNotifications: this.disableNotifications,
          setVkParams: this.setVkParams,
        }}
      >
        {this.props.children}
      </AppContext.Provider>
    );
  }
}

export function withAppContext(Component) {
  return function WrapperComponent(props) {
    return (
      <AppContext.Consumer>
        {state => <Component {...props} appContext={state}/>}
      </AppContext.Consumer>
    );
  };
}

export default AppContextProvider;
