import React, {useState} from 'react';
import moment from 'moment';
import {Cell, List, Group, PanelHeader, Panel, PullToRefresh, Tabs, TabsItem, FixedLayout} from '@vkontakte/vkui';

import MatchItem from '../../Components/Match';

import {withAppContext} from '../../Contexts/AppContext';
import {MATCH_TYPES} from '../../Constants/matchTypes';

const Matches = ({id, go, appContext}) => {
  const [type, setType] = useState(MATCH_TYPES.ENDED);
  const {state, setActiveMatch, updateMatches, featureToggle} = appContext;
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
      {
        featureToggle() &&
        <FixedLayout vertical='bottom'>
          <Tabs type='default'>
            <TabsItem
              onClick={() => setType(MATCH_TYPES.ENDED)}
              selected={type === MATCH_TYPES.ENDED}
            >
              Завершенные
            </TabsItem>
            <TabsItem
              onClick={() => setType(MATCH_TYPES.NOT_STARTED)}
              selected={type === MATCH_TYPES.NOT_STARTED}
            >
              Предстоящие
            </TabsItem>
          </Tabs>
        </FixedLayout>
      }
      <PullToRefresh
        onRefresh={updateMatches}
        isFetching={isMatchesFetching}
      >
        {
          featureToggle() ?
          <div style={{marginBottom: 56}}>
            {
              (!!upcomingMatches.length && type === MATCH_TYPES.NOT_STARTED) &&
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
              (!!endedMatches.length && type === MATCH_TYPES.ENDED) &&
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
          </div> :
          <div style={{marginBottom: 56}}>
            {
              (!!upcomingMatches.length) &&
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
              (!!endedMatches.length) &&
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
          </div>
        }
      </PullToRefresh>
    </Panel>
  );
};

export default withAppContext(Matches);
