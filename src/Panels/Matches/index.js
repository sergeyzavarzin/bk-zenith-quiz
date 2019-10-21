import React from 'react';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';
import Group from '@vkontakte/vkui/dist/components/Group/Group';
import List from '@vkontakte/vkui/dist/components/List/List';
import Cell from '@vkontakte/vkui/dist/components/Cell/Cell';

import MatchItem from '../../Components/Match';

import matches, {STATUSES} from '../../mocks/matches';

const Matches = ({id, go}) => {
  return (
    <Panel id={id}>
      <PanelHeader>
        Матчи
      </PanelHeader>
      <Group title="Предстоящие">
        <List>
          {
            matches
              .filter(match => match.status === STATUSES.PLAYED)
              .map(match =>
                <Cell
                  key={match.id}
                  size="l"
                >
                  <MatchItem
                    rival={match.rival}
                    beginTime={match.beginTime}
                    place={match.place}
                  />
                </Cell>
              )
          }
        </List>
      </Group>
      <Group title="Завершенные">
        <List>
          {
            matches
              .filter(match => match.status !== STATUSES.PLAYED)
              .map(match =>
                <Cell
                  key={match.id}
                  size="l"
                >
                  <MatchItem
                    rival={match.rival}
                    beginTime={match.beginTime}
                    place={match.place}
                    game={match.game}
                  />
                </Cell>
              )
          }
        </List>
      </Group>
    </Panel>
  );
};

export default Matches;

