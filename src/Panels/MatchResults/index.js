import React from 'react';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';
import Group from '@vkontakte/vkui/dist/components/Group/Group';
import HeaderButton from '@vkontakte/vkui/dist/components/HeaderButton/HeaderButton';
import Icon24Back from '@vkontakte/icons/dist/24/back';
import Avatar from '@vkontakte/vkui/dist/components/Avatar/Avatar';
import Cell from '@vkontakte/vkui/dist/components/Cell/Cell';
import {Div} from '@vkontakte/vkui';

import players from '../../constants/players';
import Zenith from '../../img/zenith.png';

import Jersey from '../../Components/Jersey';

import {withAppContext} from '../../context/AppContext';

const MatchView = ({id, go, context}) => {
  const {setActiveMatch} = context;
  const {activeMatch, rivals} = context.state;
  const currentRival = activeMatch && rivals.find(rival => rival.id === activeMatch.rivalId);
  const firstFive = activeMatch && players.filter(player => activeMatch.firstFive.includes(player.id));
  const twoScore = activeMatch && players.find(player => player.id === activeMatch.twoScore);
  const threeScore = activeMatch && players.find(player => player.id === activeMatch.threeScore);
  const goBack = (event) => {
    setActiveMatch(null);
    go(event);
  };
  return (
    <Panel id={id}>
      {
        activeMatch && <>
          <PanelHeader
            left={
              <HeaderButton
                data-to='matches'
                onClick={goBack}
              >
                <Icon24Back/>
              </HeaderButton>
            }>
            Зенит : {rivals.find(rival => rival.id === activeMatch.rivalId).name}
          </PanelHeader>
          <Group title='Победитель'>
            <Div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
                fontSize: 20
              }}
            >
              {
                activeMatch.score[0] !== activeMatch.score[1] ?
                  <>
                    <img
                      width={100}
                      src={activeMatch.score[0] > activeMatch.score[1] ? Zenith : currentRival.logo}
                      alt='Логотип команды'
                      style={{
                        margin: '15px 0'
                      }}
                    />
                    {
                      activeMatch.score[0] > activeMatch.score[1] ?
                        <b>Зенит</b> :
                        <b>{currentRival.name}</b>
                    }
                  </> :
                  <>
                    <div style={{display: 'flex', alignItems: 'center'}}>
                      <img
                        width={60}
                        src={Zenith}
                        alt='Зенит'
                        style={{
                          margin: '15px'
                        }}
                      />
                      <img
                        width={60}
                        src={currentRival.logo}
                        alt={currentRival.name}
                        style={{
                          margin: '15px'
                        }}
                      />
                    </div>
                    Ничья
                  </>
              }
            </Div>
          </Group>
          <Group title='Счет'>
            <Div style={{display: 'flex', justifyContent: 'space-around', alignItems: 'center', fontSize: 22}}>
              <img src={Zenith} alt='Зенит' width={50}/>
              <b>
                {activeMatch.score[0]} : {activeMatch.score[1]}
              </b>
              <img src={currentRival.logo} alt={currentRival.name} width={50}/>
            </Div>
          </Group>
          <Group title='Стартовая пятерка'>
            {
              firstFive.map(player =>
                <Cell
                  key={player.id}
                  before={<Avatar size={72} src={player.photo}/>}
                  size="l"
                  description={player.role}
                  asideContent={<Jersey number={player.number}/>}
                  bottomContent={
                    <div style={{ display: 'flex' }}>
                      <span style={{ margin: '0 15px 0 0' }}>Рост: {player.height}</span>
                      <span>Вес: {player.weight}</span>
                    </div>
                  }
                >
                  <b>{player.name}</b>
                </Cell>
              )
            }
          </Group>
          <Group title='Вбрасывание выиграла команда'>
            <Div
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                fontSize: 20
              }}
            >
              <img
                width={100}
                src={activeMatch.tossing ? Zenith : currentRival.logo}
                alt='Зенит'
                style={{
                  margin: '15px'
                }}
              />
            <b>{activeMatch.tossing ? 'Зенит': currentRival.name}</b>
            </Div>
          </Group>
          <Group title='Первый двухочковый забил'>
            <Cell
              key={twoScore.id}
              before={<Avatar size={72} src={twoScore.photo}/>}
              size="l"
              description={twoScore.role}
              asideContent={<Jersey number={twoScore.number}/>}
              bottomContent={
                <div style={{ display: 'flex' }}>
                  <span style={{ margin: '0 15px 0 0' }}>Рост: {twoScore.height}</span>
                  <span>Вес: {twoScore.weight}</span>
                </div>
              }
            >
              <b>{twoScore.name}</b>
            </Cell>
          </Group>
          <Group title='Первый трехочковый забил'>
            <Cell
              key={threeScore.id}
              before={<Avatar size={72} src={threeScore.photo}/>}
              size="l"
              description={threeScore.role}
              asideContent={<Jersey number={threeScore.number}/>}
              bottomContent={
                <div style={{ display: 'flex' }}>
                  <span style={{ margin: '0 15px 0 0' }}>Рост: {threeScore.height}</span>
                  <span>Вес: {threeScore.weight}</span>
                </div>
              }
            >
              <b>{threeScore.name}</b>
            </Cell>
          </Group>
        </>
      }
    </Panel>
  )
};

export default withAppContext(MatchView);
