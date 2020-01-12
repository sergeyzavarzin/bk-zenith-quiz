import React, {Component} from 'react';
import moment from 'moment';
import axios from 'axios';
import connectOnline from '@vkontakte/vk-connect';
import connectMock from '@vkontakte/vk-connect-mock';

import {API_URL} from '../../Constants/endpoints';

const connect = process.env.NODE_ENV === 'development' ? connectMock : connectOnline;

export const AppContext = React.createContext(true);

class AppContextProvider extends Component {

  state = {
    isAppDataFetching: false,
    isLeaderBoardFetching: false,
    isMatchesFetching: false,
    isUserDataFetching: false,
    isUserNew: true,
    user: null,
    userScore: 0,
    userTotalScore: 0,
    leaderBoard: [],
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
  };

  admins = [17188634, 127017464, 2314852];

  componentDidMount() {
    this.fetchUserData();
  }

  prepareAppData = userData => {
    this.subscribeVKActions();
    Promise
      .all([this.fetchRivals(), this.fetchMatches(), this.fetchLeaderBoard()])
      .then(([rivals, matches, leaderBoard]) => {
        const {user, userScore, userTotalScore} = userData;
        const activeMatchVote = this.getActiveMatchVote(matches);
        this.setState({user, userScore, userTotalScore, rivals, matches, activeMatchVote, leaderBoard});
        return user;
      })
      .then(async user => {
        const userVotes = await this.fetchUserVotes(user.id);
        this.setState({userVotes})
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
    this.subscribeVKActions();
    const user = await connect.sendPromise('VKWebAppGetUserInfo');
    axios
      .get(`${API_URL}/user/${user.id}`)
      .then(({data}) => this.setState({isUserNew: !data}, () => {
        this.prepareAppData( {
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

  fetchLeaderBoard = async () => {
    const leaderBoard = await axios.get(`${API_URL}/user/leaderboard`);
    return leaderBoard.data;
  };

  updateLeaderBoard = async () => {
    this.setState({isLeaderBoardFetching: true});
    const leaderBoard = await this.fetchLeaderBoard();
    this.setState({
      isLeaderBoardFetching: false,
      leaderBoard
    });
  };

  updateMatches = async () => {
    this.setState({isMatchesFetching: true});
    const matches = await this.fetchMatches();
    const activeMatchVote = this.getActiveMatchVote(matches);
    this.setState({activeMatchVote, matches}, () => this.setState({isMatchesFetching: false}));
  };

  addPlayerToFirstFive = (item) => {
    const {firstFive} = this.state;
    const selectedPlayers = firstFive.includes(item) ?
      firstFive.filter(playerId => playerId !== item) : [item, ...firstFive];
    if (selectedPlayers.length > 5) return true;
    this.setState({firstFive: selectedPlayers});
  };

  setScore = (name) => (score) => {
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

  featureToggle = () => this.admins.includes(this.state.user.id);

  render() {
    return (
      <AppContext.Provider
        value={{
          state: this.state,
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
