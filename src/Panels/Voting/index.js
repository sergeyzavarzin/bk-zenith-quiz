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

const Voting = ({id, go, changeStory, appContext}) => {
  const {setActiveMatch, state, updateMatches, featureToggle, createWallPost} = appContext;
  const {activeMatchVote, rivals, userVotes, isMatchesFetching, isUserCreateRepostForCurrentMatch} = state;
  const isUserSendAnswerForCurrentVote = !!activeMatchVote && userVotes.some(vote => vote.matchId === activeMatchVote.id);
  const now = moment();
  const isTimeEnd = !!activeMatchVote && moment.duration(now.diff(activeMatchVote.startDateTime)).asMinutes() > -10;
  const hasActiveMatchVote = !!activeMatchVote && !isTimeEnd;
  return (
    <Panel id={id}>
      <PanelHeader>
        Голосование
      </PanelHeader>
      <PullToRefresh
        onRefresh={updateMatches}
        isFetching={isMatchesFetching}
      >
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
                    featureToggle() && !isUserCreateRepostForCurrentMatch &&
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
          {
            featureToggle() &&
            <FixedLayout vertical='bottom'>
              <Advertisement/>
              <Tabs type='default'>
                <TabsItem
                  // onClick={() => this.setState({type: MERCH_TYPES.DIGITAL})}
                  // selected={type === MERCH_TYPES.DIGITAL}
                  selected
                >
                  Предстоящие
                </TabsItem>
                <TabsItem
                  // onClick={() => this.setState({type: MERCH_TYPES.PHYSICAL})}
                  // selected={type === MERCH_TYPES.PHYSICAL}
                >
                  Завершенные
                </TabsItem>
              </Tabs>
            </FixedLayout>
          }
        </Group>
      </PullToRefresh>
    </Panel>
  )
};

export default withAppContext(Voting);
