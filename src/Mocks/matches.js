import rivals from './rivals';
import moment from 'moment';
import 'moment/locale/ru';
moment().locale('ru');

export const STATUSES = {
  NOT_PLAYED: 0,
  PLAYED: 1,
};

const matches = [
  {
    id: 1,
    status: STATUSES.PLAYED,
    beginTime: moment('25.11.2019', 'DD.MM.YYYY').format('DD MMM YYYY'),
    rival: rivals.find(rival => rival.name === 'Зелена Гура'),
    place: 'VTB Арена',
    game: [69, 76],
  },
  {
    id: 3,
    status: STATUSES.PLAYED,
    beginTime: moment('23.11.2019', 'DD.MM.YYYY').format('DD MMM YYYY'),
    rival: rivals.find(rival => rival.name === 'ЦСКА'),
    place: 'VTB Арена',
    game: [69, 76],
  },
  {
    id: 2,
    status: STATUSES.NOT_PLAYED,
    beginTime: moment('10.10.2019', 'DD.MM.YYYY').format('DD MMM YYYY'),
    rival: rivals.find(rival => rival.name === 'ЦСКА'),
    place: 'VTB Арена',
    game: [87, 76],
  },
];

export default matches;