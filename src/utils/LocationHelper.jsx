import { chain, map } from 'lodash';

export const normalizeByName = (filters, filterType) => (
  chain(filters)
    .sortBy(filterType)
    .groupBy(filterType)
    .value()
);

export const normalizeById = (filters, filterType) => (
  chain(filters)
    .sortBy(filterType)
    .groupBy(filterType)
    .value()
);

export const getNames = (filters, filterType) => (
  chain(filters)
    .groupBy(filterType)
    .keys()
    .sortBy(name => name.toLowerCase())
    .value()
);

export const getIdsFrom = (filters, filterType) => (
  chain(filters)
    .map(objects => map(objects, object => object[filterType]))
    .flattenDeep()
    .uniq()
    .value()
);

export const getSelectedFilterNames = (filters, selected, filterType) => (
  chain(filters)
    .pick(selected)
    .map(object => map(object, obj => obj[filterType]))
    .flattenDeep()
    .uniq()
    .sortBy(name => name.toLowerCase())
    .value()
);
