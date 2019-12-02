import React from 'react';
import {Avatar, Cell, List, Group, Panel, PanelHeader, Link} from '@vkontakte/vkui';
import Icon24LogoInstagram from '@vkontakte/icons/dist/24/logo_instagram';
import Icon24LogoTwitter from '@vkontakte/icons/dist/24/logo_twitter';

import Jersey from '../../Components/Jersey';

import players from '../../Constants/players';

const Players = ({id}) => {

  return (
    <Panel id={id}>
      <PanelHeader>
        Игроки
      </PanelHeader>
      <Group title="Команда">
        <List>
          {
            players
              .sort((a, b) => a.number < b.number ?  -1 : 1)
              .map(player =>
              <Cell
                key={player.id}
                before={<Avatar size={72} src={player.photo}/>}
                size="l"
                description={player.role}
                asideContent={
                  <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                    <Jersey number={player.number}/>
                  </div>
                }
                bottomContent={
                  <div>
                    <span style={{ margin: '0 15px 0 0' }}>Рост: {player.height}</span>
                    <span>Вес: {player.weight}</span>
                    <div style={{ display: 'flex', marginTop: 5 }}>
                      {
                        player.instagram &&
                        <Link href={`https://www.instagram.com/${player.instagram}`} target='_blank'>
                          <Icon24LogoInstagram width={30} height={30} style={{marginRight: 5}}/>
                        </Link>
                      }
                      {
                        player.twitter &&
                        <Link href={`https://twitter.com/${player.twitter}`} target='_blank'>
                          <Icon24LogoTwitter width={30} height={30} style={{marginRight: 5}}/>
                        </Link>
                      }
                    </div>
                  </div>
                }
              >
                <b>{player.name}</b>
              </Cell>
            )
          }
        </List>
      </Group>
    </Panel>
  );
};

export default Players;

