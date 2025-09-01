/**
 * Iceland postal code utilities
 */

/**
 * Validate Iceland postal code format
 * @param {string} postalCode - The postal code to validate
 * @returns {boolean} - Whether the postal code is valid
 */
export function validateIcelandPostalCode(postalCode) {
  if (!postalCode) return false;
  
  // Iceland postal codes are 3 digits
  const cleanCode = postalCode.trim();
  return /^\d{3}$/.test(cleanCode);
}

/**
 * Format Iceland postal code
 * @param {string} postalCode - The postal code to format
 * @returns {string} - Formatted postal code
 */
export function formatIcelandPostalCode(postalCode) {
  if (!postalCode) return '';
  
  // Remove any non-digits and take first 3 digits
  const cleanCode = postalCode.replace(/\D/g, '').substring(0, 3);
  return cleanCode;
}

/**
 * Common Iceland postal codes with their locations
 */
export const ICELAND_POSTAL_CODES = {
  '101': 'Reykjavík (City Center)',
  '102': 'Reykjavík (Vest-Reykjavík)', 
  '103': 'Reykjavík (Aust-Reykjavík)',
  '104': 'Reykjavík (Norður-Reykjavík)',
  '105': 'Reykjavík (Suður-Reykjavík)',
  '107': 'Reykjavík (Vest-Reykjavík)',
  '108': 'Reykjavík (Grafarvogur)',
  '109': 'Reykjavík (Breiðholt)',
  '110': 'Reykjavík (Árbær)',
  '111': 'Reykjavík (Háaleiti og Bústaðir)',
  '112': 'Reykjavík (Grafarvogur)',
  '113': 'Reykjavík (Grafarvogur)',
  '116': 'Kjalarnes',
  '121': 'Reykjavík (Laugardalur)',
  '123': 'Reykjavík (Laugardalur)',
  '124': 'Reykjavík (Fossvogur)',
  '125': 'Reykjavík (Öskjuhlíð)',
  '127': 'Reykjavík (Grafarvogur)',
  '128': 'Reykjavík (Grafarvogur)',
  '129': 'Reykjavík (Grafarvogur)',
  '130': 'Reykjavík (Grafarvogur)',
  '132': 'Reykjavík (Grafarvogur)',
  '150': 'Reykjavík (Seltjarnarnes)',
  '155': 'Reykjavík (Seltjarnarnes)',
  '170': 'Seltjarnarnes',
  '172': 'Seltjarnarnes',
  '200': 'Kópavogur',
  '201': 'Kópavogur',
  '202': 'Kópavogur',
  '203': 'Kópavogur',
  '210': 'Garðabær',
  '212': 'Garðabær',
  '220': 'Hafnarfjörður',
  '221': 'Hafnarfjörður',
  '222': 'Hafnarfjörður',
  '225': 'Álftanes',
  '230': 'Reykjanesbær',
  '232': 'Reykjanesbær',
  '233': 'Reykjanesbær',
  '235': 'Keflavíkurflugvöllur',
  '240': 'Grindavík',
  '245': 'Sandgerði',
  '250': 'Garður',
  '260': 'Reykjanesbær',
  '270': 'Mosfellsbær',
  '271': 'Mosfellsbær'
};

/**
 * Get location name from postal code
 * @param {string} postalCode - The postal code
 * @param {string} language - Language ('is' or 'en')
 * @returns {string} - Location name
 */
export function getLocationFromPostalCode(postalCode, language = 'is') {
  const location = ICELAND_POSTAL_CODES[postalCode];
  if (!location) return '';
  
  if (language === 'en') {
    // Translate common Icelandic place names for English
    return location
      .replace('Reykjavík', 'Reykjavik')
      .replace('Kópavogur', 'Kopavogur')
      .replace('Hafnarfjörður', 'Hafnarfjordur')
      .replace('Garðabær', 'Gardabaer')
      .replace('Mosfellsbær', 'Mosfellsbaer');
  }
  
  return location;
}

/**
 * Get popular postal codes (most commonly used)
 */
export const POPULAR_POSTAL_CODES = [
  '101', // Reykjavík City Center
  '105', // Reykjavík South
  '108', // Reykjavík Grafarvogur  
  '200', // Kópavogur
  '220', // Hafnarfjörður
  '210', // Garðabær
  '270'  // Mosfellsbær
];

/**
 * Validate and suggest postal code
 * @param {string} input - User input
 * @returns {object} - Validation result with suggestions
 */
export function validateAndSuggestPostalCode(input) {
  if (!input) {
    return {
      valid: false,
      suggestions: POPULAR_POSTAL_CODES,
      message: 'Enter postal code'
    };
  }
  
  const cleanInput = formatIcelandPostalCode(input);
  
  if (validateIcelandPostalCode(cleanInput)) {
    const location = getLocationFromPostalCode(cleanInput);
    return {
      valid: true,
      code: cleanInput,
      location: location,
      message: location ? `${cleanInput} - ${location}` : cleanInput
    };
  }
  
  // Find suggestions based on partial input
  const suggestions = Object.keys(ICELAND_POSTAL_CODES)
    .filter(code => code.startsWith(cleanInput))
    .slice(0, 5);
    
  return {
    valid: false,
    suggestions: suggestions.length > 0 ? suggestions : POPULAR_POSTAL_CODES,
    message: 'Invalid postal code format'
  };
}