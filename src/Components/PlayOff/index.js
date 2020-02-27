import React from 'react';
import {Cell, Group, List} from '@vkontakte/vkui';

import {withAppContext} from '../../Contexts/AppContext';

const PlayOff = ({appContext}) => {
  const {
    state: {
      matches,
      rivals,
    }
  } = appContext;

  const playOffMatches = matches
    .filter(({isPlayOff}) => isPlayOff)
    .sort((a, b) => a > b);

  return (
    <>
      <div style={{marginBottom: 60}}>
        {
          playOffMatches.map((item, index) =>
            <Group
              key={item.id}
              title={
                (128 / 2 ** (index + 1)) !== 1 ?
                  `1/${128 / 2 ** (index + 1)}` : 'Финал'
              }
            >
              <List>
                <Cell expandable>
                  Зенит : {rivals.find(({id}) => id === item.rivalId).name}
                </Cell>
              </List>
            </Group>
          )
        }
      </div>
    </>
  )
};

export default withAppContext(PlayOff);
