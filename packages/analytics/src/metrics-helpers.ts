export function calculateConversionRate(completed: number, started: number): number {
  if (started === 0) return 0;
  return Math.round((completed / started) * 10000) / 100;
}

export function calculateNoShowRate(noShows: number, totalBookings: number): number {
  if (totalBookings === 0) return 0;
  return Math.round((noShows / totalBookings) * 10000) / 100;
}

export function aggregateByPeriod<T extends { date: string }>(items: T[], period: 'day' | 'week' | 'month'): Map<string, T[]> {
  const map = new Map<string, T[]>();
  for (const item of items) {
    let key: string;
    const d = new Date(item.date);
    if (period === 'day') key = item.date;
    else if (period === 'week') {
      const dayOfWeek = d.getDay();
      const weekStart = new Date(d);
      weekStart.setDate(d.getDate() - dayOfWeek);
      key = weekStart.toISOString().split('T')[0];
    } else {
      key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
    }
    const list = map.get(key) ?? [];
    list.push(item);
    map.set(key, list);
  }
  return map;
}
