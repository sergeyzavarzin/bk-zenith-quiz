import React from 'react';
import {Gallery} from '@vkontakte/vkui';

import {withAppContext} from '../../Contexts/AppContext';

import './Advertisement.scss';

const Advertisement = () => {
  return (
    <Gallery
      autoplay={4000}
      bullets={false}
      slideWidth='100%'
      className='advertisement'
    >
      <a
        className='advertisement__slide'
        href='https://winline.ru/'
        target='_blank'
        rel="noopener noreferrer"
      >
        <img
          className='advertisement__image'
          src='http://adm.basket.fc-zenit.ru/upload/iblock/c20/c20c4c82528ede6d8d66213360b7167d.png'
          alt='Winline'
        />
      </a>
      <a
        className='advertisement__slide'
        href='https://www.gazprom.ru/'
        target='_blank'
        rel="noopener noreferrer"
      >
        <img
          className='advertisement__image'
          src='http://adm.basket.fc-zenit.ru/upload/iblock/8aa/8aa402590d098dfb4df200fede0b24cc.png'
          alt='Winline'
        />
      </a>
    </Gallery>
  )
};

export default withAppContext(Advertisement);
