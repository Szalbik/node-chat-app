// function formatDate(date) {
//   const hours = date.getHours();
//   const minutes = date.getMinutes();
//   const seconds = date.getSeconds();
//   const day = date.getDate();
//   const month = date.getMonth() + 1;
//   const year = date.getFullYear();
//   return `${hours}:${minutes}:${seconds} | ${day}-${month}-${year}r.`;
// }

const generateMessage = (from, text) => ({
  from,
  text,
  createdAt: new Date().getTime()
});

const generateLocationMessage = (from, latitude, longitude) => ({
  from,
  url: `https://www.google.com/maps?q=${latitude},${longitude}`,
  createdAt: new Date().getTime()
});

module.exports = { generateMessage, generateLocationMessage };
