export const formatTime = (time: string): string => {
  const [hours, minutes] = time.split(':');
  const hour = parseInt(hours, 10);
  const ampm = hour >= 12 ? 'PM' : 'AM';
  const standardHour = hour % 12 || 12;
  return `${standardHour}:${minutes} ${ampm}`;
}; 