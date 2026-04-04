export function formatDate(originalDate: string | number | Date): string {
  const date = new Date(originalDate);

  if (isNaN(date.getTime())) {
    throw new Error(`Invalid date: ${date}`);
  }
  const formattedDate = date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  return formattedDate;
}
