module.exports = (dateString) => {
  if (!dateString) return '';
  const dateInMiliseconds = Date.parse(dateString);
  const offSetInMiliseconds = new Date().getTimezoneOffset() * 60 * 1000;
  return new Date(dateInMiliseconds + offSetInMiliseconds);
}