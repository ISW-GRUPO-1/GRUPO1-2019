const formatDate = (date) => new Date(date).toLocaleDateString();

const formatTime = (time) => {
  const hour = new Date(time).toTimeString();
  return hour.slice(0, 5);
};

module.exports = { formatDate, formatTime };
