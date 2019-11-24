import React from 'react';
import moment from 'moment';
import {Cell, List, Group, PanelHeader, Panel, PullToRefresh} from '@vkontakte/vkui';

import MatchItem from '../../Components/Match';

import {withAppContext} from '../../Contexts/AppContext';

const Matches = ({id, go, appContext}) => {
  const {state, setActiveMatch, updateMatches} = appContext;
  const {matches, rivals, isMatchesFetching} = state;
  const sortByDate = (a, b) =>
    new moment(a.startDateTime).format('YYYYMMDD') - new moment(b.startDateTime).format('YYYYMMDD');
  const upcomingMatches = matches
    .filter(match => !match.score.length)
    .sort(sortByDate);
  const endedMatches = matches
    .filter(match => match.score.length)
    .sort(sortByDate);
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
                        buyTickets={match.buyTicketsUrl || 'https://tickets.fc-zenit.ru/#basketball'}
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
