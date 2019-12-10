const NAME_FILTERS = [
  `all`,
  `overdue`,
  `today`,
  `favorites`,
  `repeating`,
  `tags`,
  `archive`
];


const createFilterTemplate = (name) => {
  return {
    name,
    'count': Math.floor(Math.random() * 10)
  };
};

const generateFilters = () => {
  return NAME_FILTERS.map((name) => createFilterTemplate(name));
};

export {generateFilters};
