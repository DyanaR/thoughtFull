export function formatUpdatedAt(dateString: string) {
  const date = new Date(dateString);

  const day = date.getDate();

  const month = date.toLocaleString("en-GB", {
    month: "long",
  });

  const year = date.getFullYear();

  const time = date
    .toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    })
    .replace(" ", "");

  return `${day} ${month} ${year} ${time}`;
}
