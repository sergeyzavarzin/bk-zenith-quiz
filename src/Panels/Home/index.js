import React from 'react';
import {Avatar, Cell, Group, List, PanelHeader, Panel} from '@vkontakte/vkui';
import Icon24Settings from '@vkontakte/icons/dist/24/settings';
import Icon24MarketOutline from '@vkontakte/icons/dist/24/market_outline';
import Icon24Reorder from '@vkontakte/icons/dist/24/reorder';

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
            description={`${userScore} баллов доступно`}
          >
            {`${user.first_name} ${user.last_name}`}
          </Cell>
					<Cell>
						{userTotalScore} очков / {1} место в турнироной таблице
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
