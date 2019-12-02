const costTimeFormat = (value) => {
  return value < 10 ? `0${value}` : value;
};

export const formatTime = (date) => {
  const hours = costTimeFormat(date.getHours() % 12);
  const minutes = costTimeFormat(date.getMinutes());
  const interval = date.getHours > 11 ? `PM` : `AM`;

  return `
    ${hours}:${minutes} ${interval}
  `;
};
