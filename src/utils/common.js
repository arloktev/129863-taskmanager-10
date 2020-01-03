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

const costTimeFormat = (value) => {
  return value < 10 ? `0${value}` : value;
};

export const formatTime = (date) => {
  const hours = costTimeFormat(date.getHours() % 12);
  const minutes = costTimeFormat(date.getMinutes());
  const interval = date.getHours > 11 ? `PM` : `AM`;

  return `${hours}:${minutes} ${interval}`;
};
