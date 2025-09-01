/**
 * Currency formatting utilities for Iceland defaults
 */

/**
 * Format price in Icelandic Krona (ISK)
 * @param {number} amount - The amount to format
 * @param {string} language - Language code ('is' or 'en')
 * @returns {string} - Formatted currency string
 */
export function formatISK(amount, language = 'is') {
  if (!amount || isNaN(amount)) return '';
  
  // Convert to number if string
  const numAmount = typeof amount === 'string' ? parseFloat(amount) : amount;
  
  if (language === 'is') {
    // Icelandic format: 1.500.000 kr
    return new Intl.NumberFormat('is-IS', {
      style: 'decimal',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(numAmount) + ' kr';
  } else {
    // English format: ISK 1,500,000
    return 'ISK ' + new Intl.NumberFormat('en-US', {
      style: 'decimal',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(numAmount);
  }
}

/**
 * Format price range in Icelandic Krona
 * @param {number} min - Minimum amount
 * @param {number} max - Maximum amount  
 * @param {string} language - Language code ('is' or 'en')
 * @returns {string} - Formatted price range
 */
export function formatISKRange(min, max, language = 'is') {
  if (!min || !max) return '';
  
  const minFormatted = formatISK(min, language).replace(' kr', '').replace('ISK ', '');
  const maxFormatted = formatISK(max, language);
  
  if (language === 'is') {
    return `${minFormatted}-${maxFormatted}`;
  } else {
    return `ISK ${minFormatted}-${maxFormatted.replace('ISK ', '')}`;
  }
}

/**
 * Parse ISK amount from string
 * @param {string} iskString - String like "1.500.000 kr" or "ISK 1,500,000"
 * @returns {number} - Parsed amount
 */
export function parseISK(iskString) {
  if (!iskString) return 0;
  
  // Remove currency symbols and normalize
  const cleanString = iskString
    .replace(/\s?(kr|ISK)\s?/gi, '')
    .replace(/[.,]/g, '');
    
  return parseInt(cleanString) || 0;
}

/**
 * Default currency settings for Iceland
 */
export const ICELAND_CURRENCY = {
  code: 'ISK',
  symbol: 'kr',
  name: 'Icelandic Krona',
  nameIs: 'Íslensk króna',
  locale: 'is-IS'
};

/**
 * Common price ranges for different service categories in ISK
 */
export const COMMON_PRICE_RANGES = {
  handcraft: { min: 25000, max: 500000 },
  bathroom: { min: 800000, max: 2500000 },
  automotive: { min: 15000, max: 300000 },
  cleaning: { min: 15000, max: 80000 },
  moving: { min: 30000, max: 200000 },
  majorProjects: { min: 1000000, max: 10000000 }
};