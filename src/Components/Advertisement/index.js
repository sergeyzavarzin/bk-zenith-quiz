import React from 'react';
import {Gallery} from '@vkontakte/vkui';

import {withAppContext} from '../../Contexts/AppContext';

import './Advertisement.scss';

const Advertisement = () => {
  return (
    <Gallery
      autoplay={3000}
      bullets={false}
      slideWidth='100%'
      className='advertisement'
    >
      <div className='advertisement__slide' style={{width: '100%', height: 70, background: 'red'}}/>
      <div className='advertisement__slide' style={{width: '100%', height: 140, background: 'green'}}/>
      <div className='advertisement__slide' style={{width: '100%', height: 40, background: 'blue'}}/>
    </Gallery>
  )
};

export default withAppContext(Advertisement);
