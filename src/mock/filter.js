const NAME_FILTERS = [
  `all`,
  `overdue`,
  `today`,
  `favorites`,
  `repeating`,
  `tags`,
  `archive`
];

const filter = () => {
  return NAME_FILTERS.map((name) => {
    return {
      name,
      'count': Math.floor(Math.random() * 10)
    };
  });
};

export {filter};
