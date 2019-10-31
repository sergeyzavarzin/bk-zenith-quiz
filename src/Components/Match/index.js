import React from 'react';
import classNames from 'classnames';

import ZenithLogo from '../../img/zenith.png';

import './Match.scss';

const Match = ({rival, place, beginTime, game}) => {
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
          Зенит : {rival.name}
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
        <span className='match__info'>
          {place}, {beginTime}
        </span>
      </div>
    </div>
  ) : (<></>)
};

export default Match;
