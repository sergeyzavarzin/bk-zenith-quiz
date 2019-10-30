import React, {Component} from 'react';
import axios from 'axios';

export const AppContext = React.createContext(true);

class AppProvider extends Component {

  state = {
    rivals: [],
    matches: [],
    firstFive: [],
    twoScore: null,
    threeScore: null,
    tossing: null,
    winner: null,
    clubScore: 0,
    rivalScore: 0,
  };

  componentDidMount() {
    // this.fetchMatches();
    // this.fetchRivals();
  }

  fetchRivals = () => {
    axios
      .get('http://192.168.0.200:8080/rival')
      .then(response => this.setState({rivals: response.data}))
      .catch(err => console.log(err))
  };

  fetchMatches = () => {
    axios
      .get('http://192.168.0.200:8080/match')
      .then(response => this.setState({matches: response.data}))
      .catch(err => console.log(err))
  };

  addPlayerToFirstFive = (item) => {
    const {firstFive} = this.state;
    const selectedPlayers = firstFive.includes(item) ?
      firstFive.filter(playerId => playerId !== item) : [item, ...firstFive];
    if (selectedPlayers.length > 5) return true;
    this.setState({firstFive: selectedPlayers});
  };

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
    const { firstFive, tossing, twoScore, threeScore, clubScore, rivalScore} = this.state;
    axios
      .post('http://192.168.0.200:8080/vote/create', {
        id: 100,
        playerId: 101,
        matchId: 102,
        firstFive,
        tossing,
        twoScore,
        threeScore,
        winner: clubScore > rivalScore,
        score: [clubScore, rivalScore]
      })
      .then(result => console.log(result))
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
        {state => <Component {...props} context={state} />}
      </AppContext.Consumer>
    );
  };
}

export default AppProvider;
