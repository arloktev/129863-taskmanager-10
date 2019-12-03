const NAME_FILTERS = [
  `all`,
  `overdue`,
  `today`,
  `favorites`,
  `repeating`,
  `tags`,
  `archive`
];

const generateFilters = () => {
  return NAME_FILTERS.map((name) => {
    return {
      name,
      'count': Math.floor(Math.random() * 10)
    };
  });
};

export {generateFilters};
