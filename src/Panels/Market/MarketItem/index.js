import React from 'react';
import {Button, Counter} from '@vkontakte/vkui';

import './MarketItem.scss';

const MarketItem = ({image, name, price}) => {
  return (
    <div className='market-item'>
      <img
        className='market-item__image'
        src={image}
        alt={name}
      />
      <div className='market-item__name'>{name}</div>
      <Button
        level='commerce'
        size='xl'
        after={<Counter>{price}</Counter>}
      >
        Купить
      </Button>
    </div>
  )
};

export default MarketItem;
