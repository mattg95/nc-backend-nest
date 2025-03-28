import { DateTime } from 'luxon';

/**
 * Transforms database dates to Luxon DateTimes.
 *
 * Handles both MySql datetime and bigint dates
 */
export const DateTimeTransformer = (type: 'datetime' | 'bigint') => ({
  from: (value: Date | null | string | undefined): DateTime | null => {
    if (value === null || value === undefined) {
      return null;
    }

    if (value instanceof Date) {
      return DateTime.fromJSDate(value, { zone: 'utc' });
    }

    return DateTime.fromSeconds(Number(value));
  },

  to: (value: DateTime | undefined | null): string | null | undefined => {
    if (!value) {
      return value;
    }

    if (type === 'datetime') {
      return value.toISO();
    }

    return value.toUnixInteger().toString();
  },
});
