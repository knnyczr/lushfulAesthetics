export const formatDate = (dateString) => {
  const date = new Date(dateString).toLocaleString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
  return date;
};
