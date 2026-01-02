export const getVideoAge = (releaseDate) => {
  const now = new Date();
  const release = new Date(releaseDate);

  // Difference in seconds
  const diffInSeconds = Math.floor((now - release) / 1000);

  // Time constants in seconds

  // Logic to find the largest unit
  if (diffInSeconds >= 31536000) {
    const years = Math.floor(diffInSeconds / 31536000);
    return `${years} ${years > 1 ? 'years' : 'year'} ago`;
  }

  if (diffInSeconds >= 2592000) {
    const months = Math.floor(diffInSeconds / 2592000);
    return `${months} ${months > 1 ? 'months' : 'month'} ago`;
  }

  if (diffInSeconds >= 86400) {
    const days = Math.floor(diffInSeconds / 86400);
    return `${days} ${days > 1 ? 'days' : 'day'} ago`;
  }

  if (diffInSeconds >= 3600) {
    const hours = Math.floor(diffInSeconds / 3600);
    return `${hours} ${hours > 1 ? 'hours' : 'hour'} ago`;
  }

  if (diffInSeconds >= 60) {
    const mins = Math.floor(diffInSeconds / 60);
    return `${mins} ${mins > 1 ? 'mins' : 'min'} ago`;
  }

  return 'Just now';
};
