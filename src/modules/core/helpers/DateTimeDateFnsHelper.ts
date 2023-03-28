import { toDate, intlFormat, parseJSON } from 'date-fns'

import type { IDateTime } from '@/modules/core/contracts/IDateTime'

export class DateTimeDateFnsHelper implements IDateTime {
  parseJSON(date: Date | number | string): Date {
    return parseJSON(date)
  }

  toDate(date: Date | number): Date {
    return toDate(date)
  }

  intlFormat(date: Date | number, formatOptions?: object, localeOptions?: object): string {
    return intlFormat(date, formatOptions, localeOptions)
  }
}
