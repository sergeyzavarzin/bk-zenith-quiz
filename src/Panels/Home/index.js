import React from 'react';
import {Avatar, Cell, Group, List, PanelHeader, Panel} from '@vkontakte/vkui';

import Icon24Settings from '@vkontakte/icons/dist/24/settings';

const Home = ({ id, go, fetchedUser, userScore }) => (
	<Panel id={id}>
		<PanelHeader>Профиль</PanelHeader>
		{
			fetchedUser &&
			<Group title='Ваши данные'>
				<Cell
					before={fetchedUser.photo_200 ? <Avatar size={72} src={fetchedUser.photo_200}/> : null}
					size='l'
					description={`${userScore} баллов`}
				>
					{`${fetchedUser.first_name} ${fetchedUser.last_name}`}
				</Cell>
			</Group>
		}
		<Group>
			<List>
				<Cell
					expandable
					before={<Icon24Settings />}
					data-to='help'
					onClick={go}
				>
					Помощь
				</Cell>
			</List>
		</Group>
	</Panel>
);

export default Home;
