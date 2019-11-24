import React from 'react';
import axios from 'axios';
import {Avatar, Cell, Group, List, PanelHeader, Panel, Spinner, PullToRefresh} from '@vkontakte/vkui';
import Icon24MarketOutline from '@vkontakte/icons/dist/24/market_outline';
import Icon24Reorder from '@vkontakte/icons/dist/24/reorder';
import Icon28Game from '@vkontakte/icons/dist/28/game';
import Icon28FavoriteOutline from '@vkontakte/icons/dist/28/favorite_outline';
import Icon28HelpOutline from '@vkontakte/icons/dist/28/help_outline';

import {withAppContext} from '../../Contexts/AppContext';
import {API_URL} from '../../Constants/endpoints';

class Home extends React.Component {

  state = {
    position: null,
  };

  componentDidMount() {
    this.getUserPosition();
  }

  getUserPosition = () => {
    const {id} = this.props.appContext.state.user;
    axios
      .get(`${API_URL}/user/position?id=${id}`)
      .then(({data: {position}}) => this.setState({position}))
  };

  onRefresh = () => {
    const {updateUserData} = this.props.appContext;
    this.getUserPosition();
    updateUserData();
  };

  render() {
    const {id, go, appContext} = this.props;
    const {position} = this.state;
    const {state} = appContext;
    const {user, userScore, userTotalScore, isUserDataFetching} = state;
    return (
      <Panel id={id}>
        <PanelHeader>Профиль</PanelHeader>
        <PullToRefresh
          onRefresh={this.onRefresh}
          isFetching={isUserDataFetching}
        >
          {
            user &&
            <Group title='Ваши данные'>
              <Cell
                before={user.photo_200 ? <Avatar size={72} src={user.photo_200}/> : null}
                size='l'
                description={`${userTotalScore} очков`}
              >
                {`${user.first_name} ${user.last_name}`}
              </Cell>
              <Cell before={<Icon28FavoriteOutline width={24}/>}>
                {userScore} баллов доступно
              </Cell>
              <Cell before={<Icon28Game width={24}/>}>
                {
                  position ?
                    <span>{position} место в турнирной таблице</span> :
                    <Spinner size='small'/>
                }
              </Cell>
            </Group>
          }
          <Group>
            <List>
              <Cell
                expandable
                before={<Icon28HelpOutline size={24}/>}
                data-to='help'
                onClick={go}
              >
                Помощь
              </Cell>
            </List>
          </Group>
          <Group>
            <List>
              <Cell
                expandable
                before={<Icon24MarketOutline/>}
                data-to='market'
                onClick={go}
              >
                Магазин
              </Cell>
              <Cell
                expandable
                before={<Icon24Reorder/>}
                data-to='purchases'
                onClick={go}
              >
                Мои покупки
              </Cell>
            </List>
          </Group>
        </PullToRefresh>
      </Panel>
    );
  }
}

export default withAppContext(Home);
