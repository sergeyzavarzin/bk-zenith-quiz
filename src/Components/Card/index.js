import React from 'react';
import {Div} from '@vkontakte/vkui';

import './Card.scss';

const Card = ({children}) => {
  return (
    <Div>
      <div className='card'>
        {children}
      </div>
    </Div>
  )
};

export default Card;
