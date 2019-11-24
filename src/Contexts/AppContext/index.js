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

  componentDidMount() {
    this.prepareAppData();
  }

  prepareAppData = () => {
    const {
      subscribeVKActions,
      fetchMatches,
      fetchRivals,
      fetchUserData,
      fetchUserVotes,
      fetchLeaderBoard,
      getActiveMatchVote,
    } = this;
    subscribeVKActions();
    Promise
      .all([fetchRivals(), fetchMatches(), fetchUserData(), fetchLeaderBoard()])
      .then(([rivals, matches, userData, leaderBoard]) => {
        const {user, userScore, userTotalScore, isUserNew} = userData;
        const activeMatchVote = getActiveMatchVote(matches);
        this.setState({user, userScore, userTotalScore, rivals, matches, activeMatchVote, leaderBoard, isUserNew});
        return user;
      })
      .then(async user => {
        const userVotes = await fetchUserVotes(user.id);
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

  fetchUserData = async () => {
    const user = await connect.sendPromise('VKWebAppGetUserInfo');
    const {id, first_name, last_name, photo_100} = user;
    const userData = await axios.get(`${API_URL}/user/${id}`);
    if (!userData.data) {
      axios.post(`${API_URL}/user/create`, {id, name: `${first_name} ${last_name}`, img: photo_100});
      return {userScore: 0, userTotalScore: 0, user, isUserNew: true};
    } else {
      return {userScore: userData.data.score, userTotalScore: userData.data.totalScore, user, isUserNew: false};
    }
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
    const leaderBoard = await axios.get(`${API_URL}/user/leaderBoard`);
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

  updateUserData = async () => {
    this.setState({isUserDataFetching: true});
    const userData = await this.fetchUserData();
    const {userScore, userTotalScore} = userData;
    this.setState({userScore, userTotalScore, isUserDataFetching: false})
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
    const sortedMatches = matches.filter(match => !match.score.length)
      .sort((a, b) => new moment(a.date).format('YYYYMMDD') - new moment(b.date).format('YYYYMMDD'));
    return sortedMatches[0];
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

  render() {
    return (
      <AppContext.Provider
        value={{
          state: this.state,
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
