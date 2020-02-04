import React from 'react';
import moment from 'moment';
import {
  Div, Panel, PanelHeader, Group,
  List, Button, Cell, PullToRefresh, FixedLayout, TabsItem, Tabs
} from '@vkontakte/vkui';
import Icon56NotificationOutline from '@vkontakte/icons/dist/56/notification_outline';
import Icon24ShareOutline from '@vkontakte/icons/dist/24/share_outline';

import Advertisement from '../../Components/Advertisement';
import MatchItem from '../../Components/Match';
import Placeholder from '../../Components/Placeholder';

import {withAppContext} from '../../Contexts/AppContext';
import {MATCH_TYPES} from '../../Constants/matchTypes';

const Voting = ({id, go, changeStory, appContext}) => {
  const {setActiveMatch, state, updateMatches, createWallPost, setValue} = appContext;
  const {activeMatchVote, rivals, userVotes, isMatchesFetching, isUserCreateRepostForCurrentMatch, votingSelectedTab, matches} = state;
  const isUserSendAnswerForCurrentVote = !!activeMatchVote && userVotes.some(vote => vote.matchId === activeMatchVote.id);
  const now = moment();
  const isTimeEnd = !!activeMatchVote && moment.duration(now.diff(activeMatchVote.startDateTime)).asMinutes() > -10;
  const hasActiveMatchVote = !!activeMatchVote && !isTimeEnd;
  const sortByDateASC = (a, b) => moment.utc(b.startDateTime).diff(moment.utc(a.startDateTime));
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
        Голосование
      </PanelHeader>
      <PullToRefresh
        onRefresh={updateMatches}
        isFetching={isMatchesFetching}
      >
        {
          votingSelectedTab === MATCH_TYPES.NOT_STARTED &&
          <Group>
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
                    {
                      isUserSendAnswerForCurrentVote ?
                        <Div style={{textAlign: 'center'}}>
                          Ваш ответ принят
                        </Div> :
                        <Button
                          size='xl'
                          data-to='select-first-five'
                          onClick={go}
                          style={{marginBottom: 15}}
                        >
                          Начать
                        </Button>
                    }
                    {
                      !isUserCreateRepostForCurrentMatch &&
                      <Button
                        size='xl'
                        level='outline'
                        onClick={createWallPost}
                        before={<Icon24ShareOutline/>}
                      >
                        Поделиться (+1 балл)
                      </Button>
                    }
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
                      Открыть таблицу матчей
                    </Button>
                  }
                />
            }
          </Group>
        }
        {
          (!!endedMatches.length && votingSelectedTab === MATCH_TYPES.ENDED) &&
          <Group style={{marginBottom: 60}}>
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
        <FixedLayout vertical='bottom'>
          {votingSelectedTab === MATCH_TYPES.NOT_STARTED && <Advertisement/>}
          <Tabs type='default'>
            <TabsItem
              onClick={() => setValue('votingSelectedTab')(MATCH_TYPES.NOT_STARTED)}
              selected={votingSelectedTab === MATCH_TYPES.NOT_STARTED}
            >
              Активные
            </TabsItem>
            <TabsItem
              onClick={() => setValue('votingSelectedTab')(MATCH_TYPES.ENDED)}
              selected={votingSelectedTab === MATCH_TYPES.ENDED}
            >
              Завершенные
            </TabsItem>
          </Tabs>
        </FixedLayout>
      </PullToRefresh>
    </Panel>
  )
};

export default withAppContext(Voting);
