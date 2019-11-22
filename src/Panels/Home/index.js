import React from 'react';
import {Avatar, Cell, Group, List, PanelHeader, Panel} from '@vkontakte/vkui';
import Icon24Settings from '@vkontakte/icons/dist/24/settings';
import Icon24MarketOutline from '@vkontakte/icons/dist/24/market_outline';
import Icon24Reorder from '@vkontakte/icons/dist/24/reorder';
import Icon28Game from '@vkontakte/icons/dist/28/game';
import Icon28FavoriteOutline from '@vkontakte/icons/dist/28/favorite_outline';

import {withAppContext} from '../../Contexts/AppContext';

const Home = ({id, go, appContext}) => {
  const {user, userScore, userTotalScore} = appContext.state;
  return (
    <Panel id={id}>
      <PanelHeader>Профиль</PanelHeader>
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
						1 место в турнироной таблице
					</Cell>
        </Group>
      }
      <Group>
        <List>
          <Cell
            expandable
            before={<Icon24Settings/>}
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
    </Panel>
  );
};

export default withAppContext(Home);
