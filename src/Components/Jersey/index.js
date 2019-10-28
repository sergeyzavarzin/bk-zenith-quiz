import React from 'react';

import JerseyImg from '../../img/jersey.svg';

import './Jersey.scss';

const Jersey = ({number}) => {
  return (
    <div className='jersey'>
      <img className='jersey__image' src={JerseyImg} alt={number}/>
      <span className='jersey__number'>{number}</span>
    </div>
  )
};

export default Jersey;