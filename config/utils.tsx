export const truncateTitle = (title: string, limit: number = 20) => {
  if (title.length > limit) {
    return title.slice(0, limit) + "...";
  }
  return title;
};