import React from 'react';
import {Gallery} from '@vkontakte/vkui';

import {withAppContext} from '../../Contexts/AppContext';

import GazpromLogo from './images/gazprom.png';
import WinlineLogo from './images/winline.png';

import './Advertisement.scss';

const ads = [
  {
    id: 'Winline',
    link: 'https://winline.ru/',
    image: WinlineLogo,
  },
  {
    id: 'Gazprom',
    link: 'https://gazprom.ru/',
    image: GazpromLogo,
  },
];

const AdItem = ({id, link, image}) => !window.matchMedia('(min-width: 576px)').matches ? (
  <a
    id={id}
    className='advertisement__slide'
    href={link}
  >
    <img
      className='advertisement__image'
      src={image}
      alt={id}
    />
  </a>
) : (
  <div
    id={id}
    className='advertisement__slide'
    onClick={() => window.open(link, '_blank')}
  >
    <img
      className='advertisement__image'
      src={image}
      alt={id}
    />
  </div>
);

const Advertisement = () => {
  return (
    <Gallery
      autoplay={4000}
      bullets={false}
      slideWidth='100%'
      className='advertisement'
    >
      {
        ads.map(({id, image, link}) =>
          <AdItem
            key={id}
            id={id}
            image={image}
            link={link}
          />
        )
      }
    </Gallery>
  )
};

export default withAppContext(Advertisement);
