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

  setTwoScore = (id) => this.setState({twoScore: id});

  setThreeScore = (id) => this.setState({threeScore: id});

  setTossing = (id) => this.setState({tossing: id});

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