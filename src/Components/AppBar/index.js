import React from 'react';
import Tabbar from '@vkontakte/vkui/dist/components/Tabbar/Tabbar';
import TabbarItem from '@vkontakte/vkui/dist/components/TabbarItem/TabbarItem';
import Icon28MarketOutline from '@vkontakte/icons/dist/28/market_outline';
import Icon28ArticleOutline from '@vkontakte/icons/dist/28/article_outline';
import Icon28Profile from '@vkontakte/icons/dist/28/profile';
import Icon28Users from '@vkontakte/icons/dist/28/users';
import Icon28Game from '@vkontakte/icons/dist/28/game';

const AppBar = ({activeStory, onStoryChange}) => {
  return (
    <Tabbar>
      <TabbarItem
        onClick={onStoryChange}
        selected={activeStory === 'matches-view'}
        data-story='matches-view'
        text='Матчи'
      >
        <Icon28ArticleOutline />
      </TabbarItem>
      <TabbarItem
        onClick={onStoryChange}
        selected={activeStory === 'players-view'}
        data-story='players-view'
        text='Команда'
      >
        <Icon28Users />
      </TabbarItem>
      <TabbarItem
        onClick={onStoryChange}
        selected={activeStory === 'table-view'}
        data-story='table-view'
        text='Таблица'
      >
        <Icon28Game />
      </TabbarItem>
      <TabbarItem
        onClick={onStoryChange}
        selected={activeStory === 'market-view'}
        data-story='market-view'
        text='Магазин'
      >
        <Icon28MarketOutline />
      </TabbarItem>
      <TabbarItem
        onClick={onStoryChange}
        selected={activeStory === 'profile-view'}
        data-story='profile-view'
        text='Профиль'
      >
        <Icon28Profile />
      </TabbarItem>
    </Tabbar>
  )
};

export default AppBar;
