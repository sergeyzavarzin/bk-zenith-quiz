import React from 'react';
import {Cell, Group, List} from '@vkontakte/vkui';

import {withAppContext} from '../../Contexts/AppContext';

const PlayOff = ({go, appContext}) => {
  const {
    state: {
      matches,
      rivals,
    },
    setValue
  } = appContext;

  const playOffMatches = matches
    .filter(({isPlayOff}) => isPlayOff)
    .sort((a, b) => a > b);

  const getTitle = index => (128 / 2 ** (index + 1)) !== 1 ?
    `1/${128 / 2 ** (index + 1)}` : 'Финал';

  const goToPlayOffMatch = e => selectedPlayOff => {
    setValue('selectedPlayOff')(selectedPlayOff);
    go(e);
  };

  return (
    <>
      <div style={{marginBottom: 60}}>
        {
          playOffMatches.map((item, index) =>
            <Group
              key={item.id}
              title={getTitle(index)}
            >
              <List>
                <Cell
                  expandable
                  data-to='play-off'
                  onClick={e => goToPlayOffMatch(e)(item.id)}
                >
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
