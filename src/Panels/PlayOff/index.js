import React from 'react';
import {
  HeaderButton, List, Panel,
  PanelHeader, PanelSpinner,
  Cell, Avatar, Group, Counter, Button
} from '@vkontakte/vkui';
import Icon24BrowserBack from '@vkontakte/icons/dist/24/browser_back';
import Icon56InfoOutline from '@vkontakte/icons/dist/56/info_outline';

import Placeholder from '../../Components/Placeholder';

import {withAppContext} from '../../Contexts/AppContext';

import './PlayOff.scss';

const RED = 'rgba(250, 0, 0, .3)';
const GREEN = 'rgba(0, 250, 0, .3)';

const getCellStyle = (results, current) => {
  const rival = current === 0 ? 1 : 0;
  if (results[current].score === results[rival].score) {
    if (results[current].totalScore === results[rival].totalScore) {
      return { backgroundColor: current === 0 ? RED : GREEN }
    } else {
      return { backgroundColor: results[current].totalScore > results[rival].totalScore ? GREEN : RED }
    }
  } else {
    return { backgroundColor: results[current].score > results[rival].score ? GREEN : RED }
  }
};

const sortByTotalScore = data => (a, b) => data[a][0].totalScore > data[b][0].totalScore;

// if (process.env.NODE_ENV === 'development') {
//   window.playOff = {
//     'TSSKA06-03-20-20-00-00': {
//       next: 'REAL-MADRID07-03-20-20-00-00',
//       prev: null,
//       winners: [],
//       allPlayers: [],
//     },
//     'REAL-MADRID07-03-20-20-00-00': {
//       next: 'PARMA08-03-20-20-00-00',
//       prev: 'TSSKA06-03-20-20-00-00',
//       winners: [],
//       allPlayers: [],
//     },
//     'PARMA08-03-20-20-00-00': {
//       next: 'KHIMKI09-03-20-20-00-00',
//       prev: 'REAL-MADRID07-03-20-20-00-00',
//       winners: [],
//       allPlayers: [],
//     },
//     'KHIMKI09-03-20-20-00-00': {
//       next: 'BAVARIYA10-03-20-20-00-00',
//       prev: 'PARMA08-03-20-20-00-00',
//       winners: [],
//       allPlayers: [],
//     },
//     'BAVARIYA10-03-20-20-00-00': {
//       next: 'MAKKABI11-03-20-20-00-00',
//       prev: 'KHIMKI09-03-20-20-00-00',
//       winners: [],
//       allPlayers: [],
//     },
//     'MAKKABI11-03-20-20-00-00': {
//       next: 'FENERBAKHCHE12-03-20-20-00-00',
//       prev: 'BAVARIYA10-03-20-20-00-00',
//       winners: [],
//       allPlayers: [],
//     },
//     'FENERBAKHCHE12-03-20-20-00-00': {
//       next: null,
//       prev: 'MAKKABI11-03-20-20-00-00',
//       winners: [],
//       allPlayers: [],
//     },
//   };
// }

class PlayOff extends React.Component {

  state = {
    data: null,
    isLoading: false,
  };

  componentDidMount() {
    this.getPlayOffBoard();
  }

  getPlayOffBoard = async () => {
    const {
      fetchPlayOffBoard,
      state: {
        selectedPlayOff,
      }
    } = this.props.appContext;
    this.setState({isLoading: true});
    try {
      const data = await fetchPlayOffBoard(selectedPlayOff);
      this.setState({data})
    } finally {
      this.setState({isLoading: false})
    }
  };

  goBack = e => {
    this.props.appContext.setValue('selectedPlayOff')(null);
    this.props.go(e);
  };

  render() {
    const {id} = this.props;
    const {data, isLoading} = this.state;
    const hasResults = data && !!Object.keys(data).reduce((acc, curr) => acc + data[curr][0].score + data[curr][1].score, 0);

    // if (this.props.appContext.state.selectedPlayOff && data && Object.keys(data).length) {
    //   const winners = Object.keys(data).reduce((acc, curr) => {
    //     const winner = () => {
    //       if (data[curr][0].score === data[curr][1].score) {
    //         return data[curr][0].totalScore > data[curr][1].totalScore ? data[curr][0] : data[curr][1];
    //       } else {
    //         return data[curr][0].score > data[curr][1].score ? data[curr][0] : data[curr][1];
    //       }
    //     };
    //     return [...acc, winner()]
    //   }, []);
    //   window.playOff[this.props.appContext.state.selectedPlayOff].winners =
    //     winners.map(item => item.userId).map(item => parseInt(item)).sort();
    //   window.playOff[this.props.appContext.state.selectedPlayOff].allPlayers =
    //     Object.keys(data).reduce((acc, curr) => [...acc, data[curr][0].userId, data[curr][1].userId], []).map(item => parseInt(item)).sort();
    // }

    return (
      <Panel id={id}>
        <PanelHeader
          left={
            <HeaderButton
              data-to='table'
              onClick={this.goBack}
            >
              <Icon24BrowserBack/>
            </HeaderButton>
          }
        >
          Плей-офф
        </PanelHeader>
        {
          isLoading ?
            <PanelSpinner/> :
            <>
              {
                (data && Object.keys(data).length) ?
                  <>
                    {
                      Object
                        .keys(data)
                        .sort(sortByTotalScore)
                        .map(item =>
                        <Group key={item}>
                          <List>
                            <Cell
                              size="m"
                              before={<Avatar size={42} src={data[item][0].img}/>}
                              indicator={hasResults && <Counter>{data[item][0].score > 0 && '+'}{data[item][0].score}</Counter>}
                              description={`${data[item][0].totalScore} очков`}
                              style={hasResults ? getCellStyle(data[item], 0) : {}}
                            >
                              {data[item][0].name}
                            </Cell>
                            <Cell
                              size="m"
                              before={<Avatar size={42} src={data[item][1].img}/>}
                              indicator={hasResults && <Counter>{data[item][1].score > 0 && '+'}{data[item][1].score}</Counter>}
                              description={`${data[item][1].totalScore} очков`}
                              style={hasResults ? getCellStyle(data[item], 1) : {}}
                            >
                              {data[item][1].name}
                            </Cell>
                          </List>
                        </Group>
                      )
                    }
                  </> :
                  <Group>
                    <Placeholder
                      icon={<Icon56InfoOutline/>}
                      title='Таблица будет сформирована после завершения предыдущего тура плей-офф.'
                      action={
                        <Button
                          size='xl'
                          data-to='table'
                          onClick={this.goBack}
                        >
                          Назад
                        </Button>
                      }
                    />
                  </Group>
              }
            </>
        }
      </Panel>
    )
  }
}

export default withAppContext(PlayOff)
