import { mockEvents } from '../mocks/events';
import { formatDate } from '../utils/format-date';

const PRAGUE_JAMBASE_CODE = 'jambase:1181972';

export const getEvents = async () => {
  if (!window.isJambaseEnabled) {
    return mockEvents;
  }

  const today = new Date();
  const eventDateFrom = formatDate(today);
  const threeMonthsFromNow = new Date().setMonth(today.getMonth() + 3);
  const eventDateTo = formatDate(threeMonthsFromNow);
  const params = {
    eventDateFrom,
    eventDateTo,
    geoCityId: PRAGUE_JAMBASE_CODE,
    apikey: import.meta.env.VITE_JAMBASE_API_KEY,
  };

  const urlParams = new URLSearchParams(params);

  const eventsResponse = await fetch(
    'https://www.jambase.com/jb-api/v1/events' + '?' + urlParams,
  ).then((res) => res.json());

  return eventsResponse.events.map((event) => event.name);
};
