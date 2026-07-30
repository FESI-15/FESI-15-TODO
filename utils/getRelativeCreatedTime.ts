const MILLISECONDS_PER_MINUTE = 1000 * 60;
const MINUTES_PER_HOUR = 60;
const HOURS_PER_DAY = 24;

export const getRelativeCreatedTime = (
  createdAt: string | Date,
  now: Date = new Date(),
) => {
  const createdDate = new Date(createdAt);
  const elapsedMinutes = Math.max(
    0,
    Math.floor(
      (now.getTime() - createdDate.getTime()) / MILLISECONDS_PER_MINUTE,
    ),
  );
  const elapsedHours = Math.floor(elapsedMinutes / MINUTES_PER_HOUR);

  if (elapsedHours === 0) {
    return `${elapsedMinutes}분 전`;
  }

  if (elapsedHours < HOURS_PER_DAY) {
    return `${elapsedHours}시간 전`;
  }

  return `${Math.floor(elapsedHours / HOURS_PER_DAY)}일 전`;
};
