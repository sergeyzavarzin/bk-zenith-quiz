import React from 'react';
import {Avatar, Group, HeaderButton, Panel, PanelHeader, List, Cell, Link} from '@vkontakte/vkui';
import Icon24BrowserBack from '@vkontakte/icons/dist/24/browser_back';
import Icon24LogoInstagram from '@vkontakte/icons/dist/24/logo_instagram';
import Icon24LogoTwitter from '@vkontakte/icons/dist/24/logo_twitter';

import {withAppContext} from '../../Contexts/AppContext';
import Jersey from '../../Components/Jersey';

const PlayerInfo = ({id, go, appContext}) => {
  const {selectedPlayer} = appContext.state;
  const socials = false;
  return (
    <Panel id={id}>
      <PanelHeader
        left={
          <HeaderButton
            data-to='players'
            onClick={go}
          >
            <Icon24BrowserBack/>
          </HeaderButton>
        }
      >
        {selectedPlayer.name}
      </PanelHeader>
      <Group>
        <List>
          <Cell
            size="l"
            key={selectedPlayer.id}
            className='selectedPlayer'
            before={<Avatar size={72} src={selectedPlayer.photo}/>}
            description={selectedPlayer.role}
            asideContent={
              <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <Jersey number={selectedPlayer.number}/>
              </div>
            }
            bottomContent={
              <div>
                <span style={{margin: '0 15px 0 0'}}>Рост: {selectedPlayer.height}</span>
                <span>Вес: {selectedPlayer.weight}</span>
                {
                  socials &&
                  <div style={{display: 'flex', marginTop: 5}}>
                    {
                      selectedPlayer.instagram &&
                      <Link href={`https://www.instagram.com/${selectedPlayer.instagram}`} target='_blank'>
                        <Icon24LogoInstagram width={30} height={30} style={{marginRight: 5}}/>
                      </Link>
                    }
                    {
                      selectedPlayer.twitter &&
                      <Link href={`https://twitter.com/${selectedPlayer.twitter}`} target='_blank'>
                        <Icon24LogoTwitter width={30} height={30} style={{marginRight: 5}}/>
                      </Link>
                    }
                  </div>
                }
              </div>
            }
          >
            <b>{selectedPlayer.name}</b>
          </Cell>
        </List>
      </Group>
      {
        selectedPlayer.about && !!selectedPlayer.about.length &&
        <Group title='Об игроке'>
          <List>
            <Cell>
              {
                selectedPlayer.about.map((text, index) =>
                  <p key={index} style={{whiteSpace: 'normal', marginTop: 0}}>
                    {text}
                  </p>
                )
              }
            </Cell>
          </List>
        </Group>
      }
    </Panel>
  )
};

export default withAppContext(PlayerInfo);
