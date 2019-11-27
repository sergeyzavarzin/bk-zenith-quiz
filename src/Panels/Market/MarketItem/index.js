import React from 'react';
import {Button, Counter} from '@vkontakte/vkui';

import {withMarketContext} from '../../../Contexts/MarketContext';

import './MarketItem.scss';

const MarketItem = ({id, name, image, price, marketContext, go}) => {
  const {setSelectedMerchItem} = marketContext;
  const handleButtonClick = e => {
    setSelectedMerchItem(id);
    go(e);
  };
  return (
    <div className='market-item'>
      <div
        className='market-item__image-wrapper'
      >
        <img
          className='market-item__image'
          src={image}
          alt={name}
        />
      </div>
      <div className='market-item__name'>{name}</div>
      <Button
        level='primary'
        size='xl'
        after={<Counter>{price}</Counter>}
        data-to='order'
        onClick={handleButtonClick}
      >
        Купить
      </Button>
    </div>
  )
};

export default withMarketContext(MarketItem);
