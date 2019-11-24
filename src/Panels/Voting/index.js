import React from 'react';
import moment from 'moment';
import {Div, Panel, PanelHeader, Group, List, Button, Cell, PullToRefresh} from '@vkontakte/vkui';
import Icon56NotificationOutline from '@vkontakte/icons/dist/56/notification_outline';

import MatchItem from '../../Components/Match';

import {withAppContext} from '../../Contexts/AppContext';
import Placeholder from '../../Components/Placeholder';

const Voting = ({id, go, changeStory, appContext}) => {
  const {setActiveMatch, state, updateMatches} = appContext;
  const {activeMatchVote, rivals, userVotes, isMatchesFetching} = state;
  const isUserSendAnswerForCurrentVote = !!activeMatchVote && userVotes.some(vote => vote.matchId === activeMatchVote.id);
  const now = moment();
  const isTimeEnd = !!activeMatchVote && moment.duration(now.diff(activeMatchVote.startDateTime)).asMinutes() > -10;
  const hasActiveMatchVote = !!activeMatchVote && !isUserSendAnswerForCurrentVote && !isTimeEnd;
  return (
    <Panel id={id}>
      <PanelHeader>
        Голосование
      </PanelHeader>
      <PullToRefresh
        onRefresh={updateMatches}
        isFetching={isMatchesFetching}
      >
        <Group title={hasActiveMatchVote && 'Открытые голосования'}>
          {
            hasActiveMatchVote ?
              <>
                <List>
                  <Cell
                    size='l'
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
              <Placeholder
                icon={<Icon56NotificationOutline/>}
                title='Нет активных голосований'
                action={
                  <Button
                    size='xl'
                    data-story='matches-view'
                    onClick={changeStory}
                  >
                    Отрыть таблицу матчей
                  </Button>
                }
              />
          }
        </Group>
      </PullToRefresh>
    </Panel>
  )
};

export default withAppContext(Voting);
