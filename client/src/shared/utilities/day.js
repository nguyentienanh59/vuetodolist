import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import relativeTime from 'dayjs/plugin/relativeTime';
import toObject from 'dayjs/plugin/toObject';

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(relativeTime);
dayjs.extend(toObject);

// dayjs.getDateUnix = (value = dayjs().unix(), timeZone = 'Asia/Tokyo') => (dayjs.unix(value).tz(timeZone));
// dayjs.getDate = (value = dayjs(), timeZone = 'Asia/Tokyo') => (dayjs(value).tz(timeZone));

export default dayjs;
