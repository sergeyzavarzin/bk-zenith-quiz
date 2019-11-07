import React from 'react';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';
import Group from '@vkontakte/vkui/dist/components/Group/Group';
import List from '@vkontakte/vkui/dist/components/List/List';
import Cell from '@vkontakte/vkui/dist/components/Cell/Cell';
import Avatar from '@vkontakte/vkui/dist/components/Avatar/Avatar';

import {withAppContext} from '../../context/AppContext';

class Table extends React.Component {
 render () {
   const {id, context} = this.props;
   const {state: {leaderboard}} = context;
   return (
     <Panel id={id}>
       <PanelHeader>
         Турнирная таблица
       </PanelHeader>
       <Group title={`Топ 10 голосующих`}>
         <List>
           {
             leaderboard
               .sort((a, b) => a.score > b.score ?  -1 : 1)
               .map(item =>
                 <Cell
                   key={item.id}
                   before={<Avatar size={42} src={item.img}/>}
                   size="m"
                   asideContent={`${item.score} очков`}
                 >
                   {item.name}
                 </Cell>
               )
           }
         </List>
       </Group>
     </Panel>
   );
 }
}

export default withAppContext(Table);

