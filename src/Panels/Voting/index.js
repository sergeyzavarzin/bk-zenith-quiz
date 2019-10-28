import React from 'react';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';
import Group from '@vkontakte/vkui/dist/components/Group/Group';
import List from '@vkontakte/vkui/dist/components/List/List';
import Button from '@vkontakte/vkui/dist/components/Button/Button';
import {Div} from '@vkontakte/vkui';
import matches from '../../mocks/matches';
import Cell from '@vkontakte/vkui/dist/components/Cell/Cell';
import MatchItem from '../../Components/Match';

import {withAppContext} from '../../context/AppContext';

class Voting extends React.Component {

  state = {
    firstFive: [],
    tossing: null,
    twoScore: null,
    threeScore: null,
    winner: null,
    score: [null, null],
  };

  render() {
    const { id, go } = this.props;
    return (
      <Panel id={id}>
        <PanelHeader>
          Голосование
        </PanelHeader>
        <Group title="Предстоящий матч">
          <List>
            <Cell
              size="l"
            >
              <MatchItem
                rival={matches[0].rival}
                beginTime={matches[0].beginTime}
                place={matches[0].place}
              />
            </Cell>
          </List>
          <Div>
            <Button
              size='xl'
              data-to='select-first-five'
              onClick={go}
            >
              Начать
            </Button>
          </Div>
        </Group>
      </Panel>
    )
  }
}

export default withAppContext(Voting);