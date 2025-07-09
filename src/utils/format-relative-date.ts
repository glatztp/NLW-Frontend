const formatter = new Intl.RelativeTimeFormat('pt-BR', { style: 'short' });

export function getRelativeTimeFromNow(date: string): string {
  const now = Date.now();
  const created = new Date(date).getTime();

  const diffInSeconds = Math.floor((now - created) / 1000);

  const units: [Intl.RelativeTimeFormatUnit, number][] = [
    ['year', 60 * 60 * 24 * 365],
    ['month', 60 * 60 * 24 * 30],
    ['week', 60 * 60 * 24 * 7],
    ['day', 60 * 60 * 24],
    ['hour', 60 * 60],
    ['minute', 60],
    ['second', 1],
  ];

  for (const [unit, secondsInUnit] of units) {
    const value = Math.floor(diffInSeconds / secondsInUnit);
    if (Math.abs(value) >= 1) {
      return formatter.format(-value, unit); // negativo = passado ("há X")
    }
  }

  return 'agora';
}
