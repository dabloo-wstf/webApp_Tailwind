export const getDateAndTime = (timestamp) => {
  const date = new Date(timestamp);

  // Format the date as a readable string
  const formattedDate = date.toLocaleString();
  return formattedDate;
};
