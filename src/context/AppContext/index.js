import React, {Component} from 'react';
import moment from 'moment';
import axios from 'axios';
import connectOnline from '@vkontakte/vk-connect';
import connectMock from '@vkontakte/vk-connect-mock';

import {API_URL} from '../../constants/endpoints';

const connect = process.env.NODE_ENV === 'development' ? connectMock : connectOnline;

export const AppContext = React.createContext(true);

class AppProvider extends Component {

  state = {
    isAppLoaded: false,
    user: null,
    userScore: 0,
    leaderboard: [],
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
    const { subscribeVKActions, fetchMatches, fetchRivals, fetchUserData, fetchUserVotes, fetchLeaderboard } = this;
    subscribeVKActions();
    Promise
      .all([fetchRivals(), fetchMatches(), fetchUserData(), fetchLeaderboard()])
      .then(([rivals, matches, userData, leaderboard]) => {
        const {user, userScore} = userData;
        const sortedMatches = matches.filter(match => !match.score.length)
          .sort((a, b) => new moment(a.date).format('YYYYMMDD') - new moment(b.date).format('YYYYMMDD'));
        const activeMatchVote = sortedMatches[0];
        this.setState({user, userScore, rivals, matches, activeMatchVote, leaderboard});
        return {user, activeMatchVote}
      })
      .then(async ({user, activeMatchVote}) => {
        const userVotes = await fetchUserVotes(user.id, activeMatchVote.id);
        this.setState({userVotes: userVotes.data})
      })
      .catch(err => console.log(err))
      .finally(() => this.setState({isAppLoaded: true}));
  }

  subscribeVKActions = () => {
    connect.subscribe(({ detail: { type, data }}) => {
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
      const createdUser = await axios.post(`${API_URL}/user/create`, {id, name: `${first_name} ${last_name}`, img: photo_100});
      return {userScore: 0, user};
    } else {
      return {userScore: userData.data.score, user};
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
    const userVotes = axios.get(`${API_URL}/vote?playerId=${userId}`);
    return userVotes;
  };

  fetchLeaderboard = async () => {
    const leaderboard = await axios.get(`${API_URL}/user/leaderboard`);
    return leaderboard.data;
  };

  addPlayerToFirstFive = (item) => {
    const {firstFive} = this.state;
    const selectedPlayers = firstFive.includes(item) ?
      firstFive.filter(playerId => playerId !== item) : [item, ...firstFive];
    if (selectedPlayers.length > 5) return true;
    this.setState({firstFive: selectedPlayers});
  };

  setActiveMatchVote = (activeMatchVote) => this.setState({activeMatchVote});

  setTwoScore = (twoScore) => this.setState({twoScore});

  setThreeScore = (threeScore) => this.setState({threeScore});

  setTossing = (tossing) => this.setState({tossing});

  setWinner = (winner) => this.setState({winner});

  setScore = (name) => (score) => {
    if (!(/^\d+$/.test(score))) return false;
    if (score.length) {
      this.setState({[name]: parseInt(score)})
    } else {
      this.setState({[name]: 0});
    }
  };

  setRivalScore = (rivalScore) => this.setScore('rivalScore')(rivalScore);

  setClubScore = (clubScore) => this.setScore('clubScore')(clubScore);

  sendVote = () => {
    const {firstFive, tossing, twoScore, threeScore, clubScore, rivalScore, user, activeMatchVote} = this.state;
    axios
      .post(`${API_URL}/vote/create`, {
        id: `${user.id}-${activeMatchVote.id}`,
        playerId: `${user.id}`,
        matchId: activeMatchVote.id,
        firstFive,
        tossing: tossing === 1,
        twoScore,
        threeScore,
        winner: clubScore > rivalScore,
        score: [clubScore, rivalScore]
      })
      .then(({data}) => this.setState(prevState => {
        return {userVotes: [data, ...prevState.userVotes] }
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
          setTwoScore: this.setTwoScore,
          setThreeScore: this.setThreeScore,
          setTossing: this.setTossing,
          setWinner: this.setWinner,
          setClubScore: this.setClubScore,
          setRivalScore: this.setRivalScore,
          sendVote: this.sendVote,
          setActiveMatch: (activeMatch) => this.setState({activeMatch}),
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
        {state => <Component {...props} context={state}/>}
      </AppContext.Consumer>
    );
  };
}

export default AppProvider;