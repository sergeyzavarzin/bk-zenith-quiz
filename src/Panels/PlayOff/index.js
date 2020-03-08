import React from 'react';
import {
  HeaderButton, List, Panel,
  PanelHeader, PanelSpinner,
  Cell, Div, Avatar, Group, Counter
} from '@vkontakte/vkui';
import Icon24BrowserBack from '@vkontakte/icons/dist/24/browser_back';

import {withAppContext} from '../../Contexts/AppContext';

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
                        <Group>
                          <List key={item}>
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
                  <Div>
                    <div>
                      Нет результатов
                    </div>
                  </Div>
              }
            </>
        }
      </Panel>
    )
  }
}

export default withAppContext(PlayOff)
