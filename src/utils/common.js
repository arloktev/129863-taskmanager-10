import moment from 'moment';

export const getRandomBetween = (min, max) => {
  return min + Math.floor(Math.random() * (max - min));
};

export const getRandomElement = (array) => array[getRandomBetween(0, array.length)];

export const getRandomBoolean = () => Math.random() > 0.5;

export const getRandomDate = () => {
  const targetDate = new Date();
  const diffValue = getRandomBetween(0, 15) - 7;

  targetDate.setDate(targetDate.getDate() + diffValue);

  return targetDate;
};

export const formatTime = (date) => {
  return moment(date).format(`hh:mm A`);
};

export const formatDate = (date) => {
  return moment(date).format(`DD MMMM`);
};
