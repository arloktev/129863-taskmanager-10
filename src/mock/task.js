const DESCRIPTION_TASKS = [
  `Изучить теорию`,
  `Сделать домашку`,
  `Пройти интенсив на соточку`
];

const COLORS = [
  `black`,
  `yellow`,
  `blue`,
  `green`,
  `pink`
];

const TAGS = [
  `homework`,
  `theory`,
  `practice`,
  `intensive`,
  `keks`
];

const DAYS_REPEATING_DEFAULT = {
  'mo': false,
  'tu': false,
  'we': false,
  'th': false,
  'fr': false,
  'sa': false,
  'su': false
};

const getRandomInRange = (min, max) => {
  return min + Math.floor(Math.random() * (max - min));
};

const getRandomElementFromArray = (array) => {
  const indexRandom = getRandomInRange(0, array.length);

  return array[indexRandom];
};

const getRandomDate = () => {
  const targetDate = new Date();
  const sign = Math.random() > 0.5 ? 1 : -1;
  const diffValue = sign * getRandomInRange(0, 7);

  targetDate.setDate(targetDate.getDate() + diffValue);

  return targetDate;
};

const generateTags = (tags) => {
  return tags
    .filter(() => Math.random() > 0.5)
    .slice(0, 3);
};

const generateTask = () => {
  const dueDate = Math.random() > 0.5 ? null : getRandomDate();

  return {
    'description': getRandomElementFromArray(DESCRIPTION_TASKS),
    dueDate,
    'repeatingDays': DAYS_REPEATING_DEFAULT,
    'tags': new Set(generateTags(TAGS)),
    'color': getRandomElementFromArray(COLORS),
    'isFavorite': Math.random() > 0.5,
    'isArchive': Math.random() > 0.5,
  };
};

const generateTasks = (count) => {
  return new Array(count)
    .fill(``)
    .map(generateTask());
};

export {generateTask, generateTasks};
