/**
 * Iceland-focused utility functions for verki application
 */

// Currency utilities
export {
  formatISK,
  formatISKRange,
  parseISK,
  ICELAND_CURRENCY,
  COMMON_PRICE_RANGES
} from './currency';

// Postal code utilities  
export {
  validateIcelandPostalCode,
  formatIcelandPostalCode,
  getLocationFromPostalCode,
  validateAndSuggestPostalCode,
  ICELAND_POSTAL_CODES,
  POPULAR_POSTAL_CODES
} from './postal';

// Phone number utilities
export {
  formatIcelandPhone,
  validateIcelandPhone,
  getIcelandPhoneWithCountryCode,
  getLocalIcelandPhone,
  detectIcelandPhoneType,
  getIcelandPhonePlaceholder,
  ICELAND_PHONE,
  ICELAND_MOBILE_PREFIXES,
  ICELAND_LANDLINE_PREFIXES
} from './phone';

/**
 * Iceland-specific defaults for the application
 */
export const ICELAND_DEFAULTS = {
  language: 'is',
  currency: 'ISK',
  currencySymbol: 'kr',
  countryCode: '+354',
  locale: 'is-IS',
  timezone: 'Atlantic/Reykjavik',
  dateFormat: 'DD.MM.YYYY',
  timeFormat: '24h'
};