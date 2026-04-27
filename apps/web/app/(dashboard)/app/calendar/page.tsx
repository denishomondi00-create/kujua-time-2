import type { Metadata } from 'next'
import CalendarView from './CalendarView'

export const metadata: Metadata = {
  title: 'Calendar',
  description: 'View day, week, and month booking activity with availability context.',
}

export default function CalendarPage() {
  return <CalendarView />
}
