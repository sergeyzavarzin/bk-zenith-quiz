import React from 'react';
import moment from 'moment';
import {Div} from '@vkontakte/vkui';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';
import Group from '@vkontakte/vkui/dist/components/Group/Group';
import List from '@vkontakte/vkui/dist/components/List/List';
import Button from '@vkontakte/vkui/dist/components/Button/Button';
import Cell from '@vkontakte/vkui/dist/components/Cell/Cell';
import Icon56NotificationOutline from '@vkontakte/icons/dist/56/notification_outline';

import MatchItem from '../../Components/Match';

import {withAppContext} from '../../context/AppContext';

class Voting extends React.Component {

  render() {
    const {id, go, changeStory} = this.props;
    const {activeMatchVote, rivals, userVotes} = this.props.context.state;
    const isUserSendAnswerForCurrentVote = userVotes.some(vote => vote.matchId === activeMatchVote.id);
    return (
      <Panel id={id} >
        <PanelHeader>
          Голосование
        </PanelHeader>
        <Group title={activeMatchVote && !isUserSendAnswerForCurrentVote ? "Открытые голосования" : ""}>
          {
            activeMatchVote && !isUserSendAnswerForCurrentVote &&
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
            </>
          }
          {
            isUserSendAnswerForCurrentVote || !activeMatchVote &&
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
  }
}

export default withAppContext(Voting);
