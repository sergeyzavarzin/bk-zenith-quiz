import connect from '@vkontakte/vk-connect';

export const showWallPostBox = params => connect.send('VKWebAppShowWallPostBox', params);
