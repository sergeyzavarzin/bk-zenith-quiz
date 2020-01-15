import React from 'react';
import {Avatar, Cell, Group, List, PanelHeader, Panel, Spinner, PullToRefresh} from '@vkontakte/vkui';
import Icon24MarketOutline from '@vkontakte/icons/dist/24/market_outline';
import Icon24Reorder from '@vkontakte/icons/dist/24/reorder';
import Icon28Game from '@vkontakte/icons/dist/28/game';
import Icon28FavoriteOutline from '@vkontakte/icons/dist/28/favorite_outline';
import Icon28HelpOutline from '@vkontakte/icons/dist/28/help_outline';
import Icon24Settings from '@vkontakte/icons/dist/24/settings';
import Icon24Discussions from '@vkontakte/icons/dist/24/discussions';
import Icon24Share from '@vkontakte/icons/dist/24/share';

import {withAppContext} from '../../Contexts/AppContext';
import {showWallPostBox} from '../../Utils/showWallPostBox';

const postParams = {
  'message': 'Заходи в приложение и голосуй за матчи любимой команды!',
  'attachments': 'photo-74457752_457281666,https://vk.com/app7179287_-74457752'
};

class Home extends React.Component {

  onRefresh = () => this.props.appContext.updateUserData();

  render() {
    const {id, go, appContext} = this.props;
    const {state, featureToggle} = appContext;
    const {user, userScore, userTotalScore, isUserDataFetching, position} = state;
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
              {
                featureToggle() &&
                <Cell
                  expandable
                  before={<Icon24Share width={24}/>}
                  onClick={() => showWallPostBox(postParams)}
                >
                  Поделиться с друзьями
                </Cell>
              }
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
          <Group>
            <List>
              <Cell
                expandable
                before={<Icon24Settings/>}
                data-to='settings'
                onClick={go}
              >
                Настройки
              </Cell>
              {
                featureToggle() &&
                <Cell
                  expandable
                  before={<Icon24Discussions width={24}/>}
                  href='https://vk.me/zenitbasket'
                  target='_blank'
                >
                  Связаться с нами
                </Cell>
              }
              <Cell
                expandable
                before={<Icon28HelpOutline width={24}/>}
                data-to='help'
                onClick={go}
              >
                Помощь
              </Cell>
            </List>
          </Group>
        </PullToRefresh>
      </Panel>
    );
  }
}

export default withAppContext(Home);
