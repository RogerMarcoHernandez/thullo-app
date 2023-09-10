export const dateToString = (date: Date | number) => {
  const universalDate = Intl.DateTimeFormat("en-US", {
    hour12: false,
    dateStyle: "long",
    timeStyle: "long",
    timeZone: "UTC",
  }).format(date);
  return universalDate;
};
