export interface IDateTime {
  /**
   * Converts a complete ISO date string in UTC time, the typical format for transmitting a date in JSON, to a JavaScript Date instance.
   *
   * @param date {(Date | number | string)} A fully formed ISO8601 date string to convert.
   *
   * @throws {TypeError} 1 argument required.
   *
   * @returns {Date} The parsed date in the local time zone.
   */
  parseJSON(date: Date | number | string): Date

  /**
   * Convert the given argument to an instance of Date.
   *
   * @param date {(Date | number)} The value to convert.
   *
   * @throws {TypeError} 1 argument required.
   *
   * @returns {Date} The parsed date in the local time zone.
   */
  toDate(date: Date | number): Date

  /**
   * Return the formatted date string in the given format.
   *
   * @param date {(Date | number)} The original date.
   * @param {object} [formatOptions] An optional format options.
   * @param {object} [localeOptions] An optional locale option.
   *
   * @throws {TypeError} 1 argument required.
   * @throws {RangeError} The date param must not be invalid Date.
   *
   * @returns {string} The formatted date string.
   */
  intlFormat(date: Date | number, formatOptions?: object, localeOptions?: object): string
}
