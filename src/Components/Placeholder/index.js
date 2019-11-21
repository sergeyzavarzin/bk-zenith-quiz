import React from 'react';

import './Placeholder.scss'

const Placeholder = ({icon, title, children, action}) => {
  return (
    <div className='placeholder'>
      {icon && <div className='placeholder__icon'>{icon}</div>}
      {title && <div className='placeholder__title'>{title}</div>}
      {children && <div className='placeholder__body'>{children}</div>}
      {action && <div className='placeholder__action'>{action}</div>}
    </div>
  )
};

export default Placeholder;
