import React from 'react';
import {
  HeaderButton, List, Panel,
  PanelHeader, PanelSpinner, Cell, Div
} from '@vkontakte/vkui';
import Icon24BrowserBack from '@vkontakte/icons/dist/24/browser_back';

import {withAppContext} from '../../Contexts/AppContext';

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
    const {id, appContext} = this.props;
    const {data, isLoading} = this.state;
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
                <List>
                  {
                    Object.keys(data).map(item =>
                      <Cell key={item}>
                        {data[item][0].name} : {data[item][1].name}
                      </Cell>
                    )
                  }
                </List> :
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
