import {DescriptionTasks, DefaultRepeatingDays, Tags, Colors} from '../const';

const generateRepeatingDays = () => {
  return Object.assign({}, DefaultRepeatingDays, {'mo': getRandomBoolean()}, {'we': getRandomBoolean()}, {'fr': getRandomBoolean()});
};

const getRandomBetween = (min, max) => {
  return min + Math.floor(Math.random() * (max - min));
};

const getRandomElement = (array) => {
  const indexRandom = getRandomBetween(0, array.length);

  return array[indexRandom];
};

const getRandomBoolean = () => Math.random() > 0.5;

const getRandomDate = () => {
  const targetDate = new Date();
  const diffValue = getRandomBetween(0, 15) - 7;

  targetDate.setDate(targetDate.getDate() + diffValue);

  return targetDate;
};

const generateTags = (tags) => {
  return tags
    .filter(() => getRandomBoolean())
    .slice(0, 3);
};

const generateTask = () => {
  const dueDate = getRandomBoolean() ? null : getRandomDate();

  return {
    'description': getRandomElement(DescriptionTasks),
    dueDate,
    'repeatingDays': dueDate ? DefaultRepeatingDays : generateRepeatingDays(),
    'tags': new Set(generateTags(Tags)),
    'color': getRandomElement(Colors),
    'isFavorite': getRandomBoolean(),
    'isArchive': getRandomBoolean(),
  };
};

const generateTasks = (count) => {
  let result = [];

  for (let i = 0; i < count; i++) {
    result.push(generateTask());
  }

  return result;
};

export {generateTask, generateTasks};
