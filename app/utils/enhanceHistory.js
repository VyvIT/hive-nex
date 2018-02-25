import isObject from 'lodash/isObject';

/**
 * Enhances history object with ability to provide 'query' object, when .push'ing and provides
 * 'query' object inside location
 * @param history
 * @param parse
 * @param stringify
 * @param stringifyOptions
 * @param parseOptions
 * @returns {*}
 */
export const enhanceHistory = (history, { parse, stringify, stringifyOptions, parseOptions }) => {
  // default stringifyOptions
  const stringifyOpts = {
    encode: false,
    indices: false,
    addQueryPrefix: true,
    encodeValuesOnly: true,
    format: 'RFC1738',
    // ability to override globally
    ...stringifyOptions,
  };

  const parseOpts = {
    ignoreQueryPrefix: true,
    ...parseOptions,
  };

  const addQueryObject = (location) => {
    location.query = parse(location.search, parseOpts);
  };

  addQueryObject(history.location);

  history.listen((location) => {
    addQueryObject(location);
  });

  const orig = history.push;
  history.push = (path, state) => {
    if (isObject(path) && isObject(path.query)) {
      if (isObject(path.stringify)) {
        // history.push({
        //  query: {
        //    a: 'a'
        // },
        //  stringify: {
        //    format: 'RFC3986',
        //  }
        // })
        path.search = stringify(path.query, { ...stringifyOpts, ...path.stringify });
      } else {
        path.search = stringify(path.query, stringifyOpts);
      }
    }
    orig(path, state)
  };
  return history;
};