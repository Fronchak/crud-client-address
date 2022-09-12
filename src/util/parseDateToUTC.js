module.exports = (dateString) => {
  if (!dateString) return null;
  const dateInMiliseconds = Date.parse(dateString);
  const offSetInMiliseconds = new Date().getTimezoneOffset();
  return new Date(dateInMiliseconds + offSetInMiliseconds);
}