import {DescriptionTasks, DefaultRepeatingDays, Tags, Colors} from '../const';
import {getRandomDate, getRandomElement, getRandomBoolean} from '../utils';

const generateRepeatingDays = () => {
  return Object.assign({}, DefaultRepeatingDays, {'mo': getRandomBoolean()}, {'we': getRandomBoolean()}, {'fr': getRandomBoolean()});
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
