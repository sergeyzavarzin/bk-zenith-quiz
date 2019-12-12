import React from 'react';
import moment from 'moment';
import {Cell, List, Group, PanelHeader, Panel, PullToRefresh} from '@vkontakte/vkui';

import MatchItem from '../../Components/Match';

import {withAppContext} from '../../Contexts/AppContext';

const Matches = ({id, go, appContext}) => {
  const {state, setActiveMatch, updateMatches} = appContext;
  const {matches, rivals, isMatchesFetching} = state;
  const sortByDateDESC = (a, b) => moment.utc(a.startDateTime).diff(moment.utc(b.startDateTime));
  const sortByDateASC = (a, b) => moment.utc(b.startDateTime).diff(moment.utc(a.startDateTime));
  const upcomingMatches = matches
    .filter(match => !match.score.length)
    .sort(sortByDateDESC);
  const endedMatches = matches
    .filter(match => match.score.length)
    .sort(sortByDateASC);
  const viewMatchInfo = (event, activeMatch) => {
    setActiveMatch(activeMatch);
    go(event);
  };
  return (
    <Panel id={id}>
      <PanelHeader>
        Матчи
      </PanelHeader>
      <PullToRefresh
        onRefresh={updateMatches}
        isFetching={isMatchesFetching}
      >
        {
          !!upcomingMatches.length &&
          <Group title="Предстоящие">
            <List>
              {
                upcomingMatches
                  .map(match =>
                    <Cell
                      key={match.id}
                      size="l"
                    >
                      <MatchItem
                        rival={rivals.find(rival => rival.id === match.rivalId)}
                        beginTime={match.startDateTime}
                        place={match.place}
                        buyTickets={match.buyTicketsUrl}
                      />
                    </Cell>
                  )
              }
            </List>
          </Group>
        }
        {
          !!endedMatches.length &&
          <Group title="Завершенные">
            <List>
              {
                endedMatches
                  .map(match =>
                    <Cell
                      key={match.id}
                      size="l"
                      expandable
                      data-to='match-view'
                      onClick={e => viewMatchInfo(e, match)}
                    >
                      <MatchItem
                        rival={rivals.find(rival => rival.id === match.rivalId)}
                        beginTime={match.startDateTime}
                        place={match.place}
                        game={match.score}
                      />
                    </Cell>
                  )
              }
            </List>
          </Group>
        }
      </PullToRefresh>
    </Panel>
  );
};

export default withAppContext(Matches);
