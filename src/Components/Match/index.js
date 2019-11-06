import React from 'react';
import classNames from 'classnames';
import moment from 'moment';
import ReactMomentCountDown from 'react-moment-countdown';
import Button from '@vkontakte/vkui/dist/components/Button/Button';
import Link from '@vkontakte/vkui/dist/components/Link/Link';

import ZenithLogo from '../../img/zenith.png';

import {DATE_FORMAT} from '../../constants/format';

import './Match.scss';

const Match = ({rival, place, beginTime, game, enableCountdown, buyTickets, onCountdownEnd}) => {
  const countdown = moment(beginTime).subtract(10, 'm');
  return rival ? (
    <div className='match'>
      <div className='match__top'>
        <div className='match__logo'>
          <img className='match__logo-img' src={ZenithLogo} alt='Зенит'/>
        </div>
        <div className='match__rivals'>
          {
            game &&
            <div className={classNames('match__score', {
              'match__score--fail': game[0] < game[1],
              'match__score--draw': game[0] === game[1]
            })}>
              {game[0]}
            </div>
          }
          <span className='match__rivals-list'>Зенит : {rival.name}</span>
          {
            game &&
            <div className={classNames('match__score', {
              'match__score--fail': game[0] > game[1],
              'match__score--draw': game[0] === game[1]
            })}>
              {game[1]}
            </div>
          }
        </div>
        <div className='match__logo'>
          <img className='match__logo-img' src={rival.logo} alt={rival.name}/>
        </div>
      </div>
      <div className='match__bottom'>
        <div className='match__info'>
          {place}, {moment(beginTime).format(DATE_FORMAT)}
        </div>
        {
          enableCountdown &&
          <div className={classNames('match__countdown', {
            'match__countdown--red': countdown.diff(moment(), 'days') === 0
          })}>
            <span>
              <b>До окончания голосования:</b><br/>
              <ReactMomentCountDown
                toDate={countdown}
                targetFormatMask='DD [дн.] HH [ч.] mm [мин.] ss [сек.]'
                onCountdownEnd={onCountdownEnd}
              />
            </span>
          </div>
        }
      </div>
      {
        buyTickets &&
        <div className='match__tickets'>
          <Button size='xl' onClick={() => window.open(buyTickets)}>
            Купить билеты
          </Button>
        </div>
      }
    </div>
  ) : (<></>)
};

export default Match;
