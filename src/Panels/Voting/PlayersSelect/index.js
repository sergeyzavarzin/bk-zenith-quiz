import React from 'react';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';
import Group from '@vkontakte/vkui/dist/components/Group/Group';
import List from '@vkontakte/vkui/dist/components/List/List';
import Cell from '@vkontakte/vkui/dist/components/Cell/Cell';
import HeaderButton from '@vkontakte/vkui/dist/components/HeaderButton/HeaderButton';
import FixedLayout from '@vkontakte/vkui/dist/components/FixedLayout/FixedLayout';
import Button from '@vkontakte/vkui/dist/components/Button/Button';
import Icon24Back from '@vkontakte/icons/dist/24/back';
import Icon16CheckCircle from '@vkontakte/icons/dist/16/check_circle';
import Avatar from '@vkontakte/vkui/dist/components/Avatar/Avatar';
import {Div} from '@vkontakte/vkui';

import players from '../../../Constants/players';
import Jersey from '../../../Components/Jersey';
import {withAppContext} from '../../../Contexts/AppContext';

class PlayersSelect extends React.Component {

  renderButtonText = () => {
    const {id, selectedCount} = this.props;
    if (id !== 'select-first-five') {
      return 'Выбрать'
    } else  {
      return selectedCount < 5 ? `Выбрано ${selectedCount} из 5` : 'Далее'
    }
  };

  render() {
    const {
      id, go, nextScreen, prevScreen,
      label, title, question,
      handleItemSelect, isSelected, isButtonDisabled
    } = this.props;
    return (
      <Panel id={id}>
        <PanelHeader
          left={
            <HeaderButton
              data-to={prevScreen}
              onClick={go}
            >
              <Icon24Back/>
            </HeaderButton>
          }
        >
          {label}
        </PanelHeader>
        <Group title='Вопрос'>
          <Div>
            <b>{question}</b>
          </Div>
        </Group>
        <Group title={title} style={{marginBottom: 75}}>
          <List>
            {
              players.map(player =>
                <Cell
                  key={player.id}
                  before={
                    <Div style={{paddingLeft: 0, width: 26, height: 26}}>
                      {
                        isSelected(player.id) ?
                          <Icon16CheckCircle width={26} height={26}/> :
                          <div style={{
                            borderRadius: '50%',
                            border: '2px solid rgb(170, 174, 179)',
                            height: '100%',
                            boxSizing: 'border-box'
                          }}/>
                      }
                    </Div>
                  }
                  asideContent={<Jersey number={player.number}/>}
                  selected={player.id > 3}
                  onClick={() => handleItemSelect(player.id)}
                >
                  <Div style={{padding: 0, display: 'flex', alignItems: 'center'}}>
                    <Avatar size={42} src={player.photo} style={{marginRight: 10}}/>
                    <div>
                      <b>{player.name}</b>
                      <div style={{fontSize: 14, color: 'grey'}}>{player.role}</div>
                    </div>
                  </Div>
                </Cell>
              )
            }
          </List>
        </Group>
        <FixedLayout vertical="bottom">
          <Div className="button-next">
            <Button
              style={isButtonDisabled ? {} : {
                opacity: 0.5,
                pointerEvents: 'none',
                userSelect: 'none',
              }}
              size="xl"
              data-to={nextScreen}
              onClick={go}
            >
              {this.renderButtonText()}
            </Button>
          </Div>
        </FixedLayout>
      </Panel>
    )
  }
}

export default withAppContext(PlayersSelect);
