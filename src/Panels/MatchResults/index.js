import React from 'react';
import {
  Panel,
  Div,
  PanelHeader,
  Group,
  HeaderButton,
  Avatar,
  Cell,
  PanelSpinner
} from '@vkontakte/vkui';
import Icon24Done from '@vkontakte/icons/dist/24/done';
import Icon24Back from '@vkontakte/icons/dist/24/back';

import players from '../../Constants/players';
import Zenith from '../../Images/zenith.png';

import Jersey from '../../Components/Jersey';

import {withAppContext} from '../../Contexts/AppContext';

import './MatchResult.scss';

const resStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
  fontSize: 20
};

const Answer = ({children, isSuccess}) => {
  return (
    <Div>
      <span className='match-result__your-answer'>Ваш ответ:</span>
      <div className={isSuccess ? 'match-result__success' : 'match-result__fail'}>
        {children}
      </div>
    </Div>
  )
};

class MatchView extends React.Component {

  state = {
    isLoading: true,
    userVoteMatch: null,
  };

  async componentDidMount() {
    const {withAnswers = false} = this.props;
    if (!withAnswers) {
      this.setState({isLoading: false});
      return true;
    }
    const {fetchUserVotes, setValue} = this.props.appContext;
    const {activeMatch, userVotes, user: {id: playerId}} = this.props.appContext.state;
    const userVoteMatch = activeMatch && userVotes.find(vote => vote.matchId === activeMatch.id);
    if (userVoteMatch) {
      this.setState({userVoteMatch, isLoading: false})
    } else {
      const fetchedVoteForSelectedMatch = await fetchUserVotes({playerId, matchId: activeMatch.id});
      if (fetchedVoteForSelectedMatch && fetchedVoteForSelectedMatch.length) {
        this.setState({userVoteMatch: fetchedVoteForSelectedMatch[0]});
        setValue('userVotes')([...userVotes, fetchedVoteForSelectedMatch[0]]);
      }
      this.setState({isLoading: false})
    }
  }

  goBack = event => {
    this.props.appContext.setActiveMatch(null);
    this.props.go(event);
  };

  render() {
    const {withAnswers = false} = this.props;
    const {userVoteMatch, isLoading} = this.state;
    const {activeMatch, rivals} = this.props.appContext.state;

    const currentRival = activeMatch && rivals.find(rival => rival.id === activeMatch.rivalId);

    const userVoteFirstFive = userVoteMatch && players.filter(player => userVoteMatch.firstFive.includes(player.id));
    const matchResultFirstFive = activeMatch && players.filter(player => activeMatch.firstFive.includes(player.id));
    const firstFive = withAnswers ? userVoteFirstFive : matchResultFirstFive;

    const twoScore = activeMatch && players.find(player => player.id === activeMatch.twoScore);
    const threeScore = activeMatch && players.find(player => player.id === activeMatch.threeScore);

    const threeScoreAnswer = activeMatch && userVoteMatch && players.find(player => player.id === userVoteMatch.threeScore);
    const twoScoreAnswer = activeMatch && userVoteMatch && players.find(player => player.id === userVoteMatch.twoScore);

    return (
      <Panel id={this.props.id}>
        {
          (activeMatch && !isLoading) ? <>
            <PanelHeader
              left={
                <HeaderButton
                  data-to={this.props.prevScreen}
                  onClick={this.goBack}
                >
                  <Icon24Back/>
                </HeaderButton>
              }
            >
              Зенит : {currentRival.name}
            </PanelHeader>
            <Group title='Победитель'>
              <Div style={resStyle}>
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
              {
                (userVoteMatch && userVoteMatch.score && userVoteMatch.score.length === 2) &&
                <Answer
                  isSuccess={userVoteMatch.winner === (activeMatch.score[0] > activeMatch.score[1])}
                >
                  <Div style={resStyle}>
                    {
                      userVoteMatch.score[0] !== userVoteMatch.score[1] ?
                        <>
                          <img
                            width={100}
                            src={userVoteMatch.score[0] > userVoteMatch.score[1] ? Zenith : currentRival.logo}
                            alt='Логотип команды'
                            style={{
                              margin: '15px 0'
                            }}
                          />
                          {
                            userVoteMatch.score[0] > userVoteMatch.score[1] ?
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
                </Answer>
              }
            </Group>
            <Group title='Счет'>
              <Div style={{display: 'flex', justifyContent: 'space-around', alignItems: 'center', fontSize: 22}}>
                <img src={Zenith} alt='Зенит' width={50}/>
                <b>
                  {activeMatch.score[0]} : {activeMatch.score[1]}
                </b>
                <img src={currentRival.logo} alt={currentRival.name} width={50}/>
              </Div>
              {
                (userVoteMatch && userVoteMatch.score && userVoteMatch.score.length === 2) &&
                <Answer
                  isSuccess={
                    userVoteMatch.score[0] === activeMatch.score[0] &&
                    userVoteMatch.score[1] === activeMatch.score[1]
                  }
                >
                  <Div style={{display: 'flex', justifyContent: 'space-around', alignItems: 'center', fontSize: 22}}>
                    <img src={Zenith} alt='Зенит' width={50}/>
                    <b>
                      {userVoteMatch.score[0]} : {userVoteMatch.score[1]}
                    </b>
                    <img src={currentRival.logo} alt={currentRival.name} width={50}/>
                  </Div>
                </Answer>
              }
            </Group>
            <Group title='Стартовая пятерка'>
              {withAnswers && <Div>Ваш ответ:</Div>}
              {
                firstFive.map(player =>
                  <Cell
                    key={player.id}
                    before={<Avatar size={72} src={player.photo}/>}
                    size="l"
                    description={player.role}
                    asideContent={
                      <div style={{display: 'flex', alignItems: 'center'}}>
                        {
                          userVoteMatch && withAnswers &&
                          <>{activeMatch.firstFive.includes(player.id) && <Icon24Done style={{color: 'green'}}/>}</>
                        }
                        <Jersey number={player.number}/>
                      </div>
                    }
                    bottomContent={
                      <div style={{display: 'flex'}}>
                        <span style={{margin: '0 15px 0 0'}}>Рост: {player.height}</span>
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
              <Div style={resStyle}>
                <img
                  width={100}
                  src={activeMatch.tossing ? Zenith : currentRival.logo}
                  alt='Зенит'
                  style={{
                    margin: '15px'
                  }}
                />
                <b>{activeMatch.tossing ? 'Зенит' : currentRival.name}</b>
              </Div>
              {
                userVoteMatch &&
                <Answer isSuccess={userVoteMatch.tossing === activeMatch.tossing}>
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
                      src={userVoteMatch.tossing ? Zenith : currentRival.logo}
                      alt='Зенит'
                      style={{
                        margin: '15px'
                      }}
                    />
                    <b>{userVoteMatch.tossing ? 'Зенит' : currentRival.name}</b>
                  </Div>
                </Answer>
              }
            </Group>
            <Group title='Первый двухочковый забил'>
              <Cell
                key={twoScore.id}
                before={<Avatar size={72} src={twoScore.photo}/>}
                size="l"
                description={twoScore.role}
                asideContent={<Jersey number={twoScore.number}/>}
                bottomContent={
                  <div style={{display: 'flex'}}>
                    <span style={{margin: '0 15px 0 0'}}>Рост: {twoScore.height}</span>
                    <span>Вес: {twoScore.weight}</span>
                  </div>
                }
              >
                <b>{twoScore.name}</b>
              </Cell>
              {
                (userVoteMatch && userVoteMatch.twoScore) &&
                <Answer isSuccess={userVoteMatch.twoScore === activeMatch.twoScore}>
                  <Cell
                    key={twoScoreAnswer.id}
                    before={<Avatar size={72} src={twoScoreAnswer.photo}/>}
                    size="l"
                    description={twoScoreAnswer.role}
                    asideContent={<Jersey number={twoScoreAnswer.number}/>}
                    bottomContent={
                      <div style={{display: 'flex'}}>
                        <span style={{margin: '0 15px 0 0'}}>Рост: {twoScoreAnswer.height}</span>
                        <span>Вес: {twoScoreAnswer.weight}</span>
                      </div>
                    }
                  >
                    <b>{twoScoreAnswer.name}</b>
                  </Cell>
                </Answer>
              }
            </Group>
            <Group title='Первый трехочковый забил'>
              <Cell
                key={threeScore.id}
                before={<Avatar size={72} src={threeScore.photo}/>}
                size="l"
                description={threeScore.role}
                asideContent={<Jersey number={threeScore.number}/>}
                bottomContent={
                  <div style={{display: 'flex'}}>
                    <span style={{margin: '0 15px 0 0'}}>Рост: {threeScore.height}</span>
                    <span>Вес: {threeScore.weight}</span>
                  </div>
                }
              >
                <b>{threeScore.name}</b>
              </Cell>
              {
                (userVoteMatch && userVoteMatch.threeScore) &&
                <Answer isSuccess={userVoteMatch.threeScore === activeMatch.threeScore}>
                  <Cell
                    key={threeScoreAnswer.id}
                    before={<Avatar size={72} src={threeScoreAnswer.photo}/>}
                    size="l"
                    description={threeScoreAnswer.role}
                    asideContent={<Jersey number={threeScoreAnswer.number}/>}
                    bottomContent={
                      <div style={{display: 'flex'}}>
                        <span style={{margin: '0 15px 0 0'}}>Рост: {threeScoreAnswer.height}</span>
                        <span>Вес: {threeScoreAnswer.weight}</span>
                      </div>
                    }
                  >
                    <b>{threeScoreAnswer.name}</b>
                  </Cell>
                </Answer>
              }
            </Group>
          </> : <PanelSpinner/>
        }
      </Panel>
    )
  }
}

export default withAppContext(MatchView);
