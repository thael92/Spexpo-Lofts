import * as ICAL from 'ical.js';

export interface CalendarEvent {
  summary: string;
  startDate: Date;
  endDate: Date;
  description?: string;
  location?: string;
}

export const fetchICalEvents = async (icalUrl: string): Promise<CalendarEvent[]> => {
  try {
    const response = await fetch(icalUrl);
    if (!response.ok) {
      throw new Error(`Failed to fetch iCal data: ${response.statusText}`);
    }
    const icalData = await response.text();
    const jcalData = ICAL.parse(icalData);
    const comp = new ICAL.Component(jcalData);
    const vevents = comp.getAllSubcomponents('vevent');

    const events = vevents.map(vevent => {
      const event = new ICAL.Event(vevent);
      return {
        summary: event.summary,
        startDate: event.startDate.toJSDate(),
        endDate: event.endDate.toJSDate(),
        description: event.description,
        location: event.location,
      };
    });

    return events;
  } catch (error) {
    console.error("Error fetching or parsing iCal data:", error);
    return [];
  }
};
