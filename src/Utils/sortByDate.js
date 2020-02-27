import moment from 'moment';

const SORT_DIRECTION = {
  ASC: 'ASC',
  DESC: 'DESC',
};

const sortByDate = (direction = SORT_DIRECTION.ASC, fieldName = 'startDateTime') => (a, b) => {
  if (direction === SORT_DIRECTION.ASC) {
    return moment.utc(b[fieldName]).diff(moment.utc(a[fieldName]));
  } else {
    return moment.utc(a[fieldName]).diff(moment.utc(b[fieldName]));
  }
};

export { SORT_DIRECTION };

export default sortByDate;
