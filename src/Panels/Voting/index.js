import React from 'react';
import moment from 'moment';
import {Div, Panel, PanelHeader, Group, List, Button, Cell} from '@vkontakte/vkui';
import Icon56NotificationOutline from '@vkontakte/icons/dist/56/notification_outline';

import MatchItem from '../../Components/Match';

import {withAppContext} from '../../Contexts/AppContext';

const Voting = ({id, go, changeStory, appContext}) => {
  const {setActiveMatch, state} = appContext;
  const {activeMatchVote, rivals, userVotes} = state;
  const isUserSendAnswerForCurrentVote = activeMatchVote && userVotes.some(vote => vote.matchId === activeMatchVote.id);
  const now = moment();
  const isTimeEnd = activeMatchVote && moment.duration(now.diff(activeMatchVote.startDateTime)).asMinutes() > -10;
  return (
    <Panel id={id}>
      <PanelHeader>
        Голосование
      </PanelHeader>
      <Group title={(activeMatchVote && !isUserSendAnswerForCurrentVote && !isTimeEnd) ? "Открытые голосования" : ""}>
        {
          (activeMatchVote && !isUserSendAnswerForCurrentVote && !isTimeEnd) ?
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
                <p style={{fontSize: '22px', margin: '30px 0'}}>
                  Нет активных голосований
                </p>
                <Button
                  size='xl'
                  data-story='matches-view'
                  onClick={changeStory}
                >
                  Отрыть таблицу матчей
                </Button>
              </Div>
            </>
        }
      </Group>
    </Panel>
  )
};

export default withAppContext(Voting);
