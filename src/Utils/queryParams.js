export const queryParams = params =>
  Object.keys(params)
    .map((item, index) => {
      const key = encodeURIComponent(item);
      const value = encodeURIComponent(params[item]);
      return params[item] !== '' &&
      params[item] !== null &&
      typeof params[item] !== 'undefined'
        ? `${index === 0 ? '' : '&'}${key}=${value}`
        : '';
    })
    .join('');
