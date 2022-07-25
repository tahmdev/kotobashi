function getDaysSinceStart() {
  const now = Math.floor(new Date().getTime() / 1000);
  const start = now - 1658588400;
  const daysSinceStart = start / 86400;

  return Math.floor(daysSinceStart);
}
export default getDaysSinceStart;
