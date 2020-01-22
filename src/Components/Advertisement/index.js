import React from 'react';
import {Gallery} from '@vkontakte/vkui';

import {withAppContext} from '../../Contexts/AppContext';

import './Advertisement.scss';

const ads = [
  {
    id: 'Winline',
    link: 'https://winline.ru/',
    image: 'http://adm.basket.fc-zenit.ru/upload/iblock/c20/c20c4c82528ede6d8d66213360b7167d.png',
  },
  {
    id: 'Gazprom',
    link: 'https://www.gazprom.ru/',
    image: 'http://adm.basket.fc-zenit.ru/upload/iblock/8aa/8aa402590d098dfb4df200fede0b24cc.png',
  },
];

const AdItem = ({id, link, image}) => (
  <div
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
