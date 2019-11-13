import React from 'react';
import moment from 'moment';
import {Cell, List, Group, PanelHeader, Panel, Div, Button} from '@vkontakte/vkui';
import Icon56NotificationOutline from '@vkontakte/icons/dist/56/notification_outline';

import MatchItem from '../../Components/Match';
import {withAppContext} from '../../context/AppContext';

const Matches = ({id, go, changeStory, context}) => {
  const {state, setActiveMatch} = context;
  const {matches, rivals, activeMatchVote, userVotes} = state;
  const upcomingMatches = matches.filter(match => !match.score.length);
  const endedMatches = matches.filter(match => match.score.length);
  const isUserSendAnswerForCurrentVote = activeMatchVote && userVotes.some(vote => vote.matchId === activeMatchVote.id);
  const now = moment();
  const isTimeEnd = !!activeMatchVote && (moment.duration(now.diff(activeMatchVote.startDateTime)).asMinutes() > -10);
  const hasActiveVoting = !!activeMatchVote && !isUserSendAnswerForCurrentVote && !isTimeEnd;
  const viewMatchInfo = (event, activeMatch) => {
    setActiveMatch(activeMatch);
    go(event);
  };
  return (
    <Panel id={id}>
      <PanelHeader>
        Матчи
      </PanelHeader>
      <Group title={hasActiveVoting ? "Открытые голосования" : ""}>
        {
          hasActiveVoting ?
            <>
              <List>
                <Cell
                  size="l"
                >
                  {
                    activeMatchVote &&
                    <MatchItem
                      rival={rivals.find(rival => rival.id === activeMatchVote.rivalId)}
                      beginTime={activeMatchVote.startDateTime}
                      place={activeMatchVote.place}
                      enableCountdown
                      onCountdownEnd={() => setActiveMatch(null)}
                    />
                  }
                </Cell>
              </List>
              <Div>
                <Button
                  size='xl'
                  data-to='select-first-five'
                  onClick={go}
                >
                  Начать
                </Button>
              </Div>
            </> :
            <>
              <Div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
                color: 'grey',
              }}>
                <Icon56NotificationOutline/>
                <p style={{fontSize: '22px', margin: '20px 0'}}>
                  Нет активных голосований
                </p>
              </Div>
            </>
        }
      </Group>
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
    </Panel>
  );
};

export default withAppContext(Matches);

