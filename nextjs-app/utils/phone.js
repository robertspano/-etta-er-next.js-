/**
 * Iceland phone number utilities
 */

/**
 * Format Iceland phone number
 * @param {string} phoneNumber - The phone number to format
 * @returns {string} - Formatted phone number
 */
export function formatIcelandPhone(phoneNumber) {
  if (!phoneNumber) return '';
  
  // Remove all non-digits
  const cleaned = phoneNumber.replace(/\D/g, '');
  
  // Handle different input formats
  let localNumber = '';
  
  if (cleaned.startsWith('354')) {
    // Starts with country code
    localNumber = cleaned.substring(3);
  } else if (cleaned.startsWith('00354')) {
    // Starts with international prefix
    localNumber = cleaned.substring(5);
  } else {
    // Assume local number
    localNumber = cleaned;
  }
  
  // Iceland phone numbers are 7 digits
  if (localNumber.length !== 7) {
    return phoneNumber; // Return original if invalid
  }
  
  // Format as XXX-XXXX
  return `${localNumber.substring(0, 3)}-${localNumber.substring(3)}`;
}

/**
 * Validate Iceland phone number
 * @param {string} phoneNumber - The phone number to validate
 * @returns {boolean} - Whether the phone number is valid
 */
export function validateIcelandPhone(phoneNumber) {
  if (!phoneNumber) return false;
  
  const cleaned = phoneNumber.replace(/\D/g, '');
  
  // Check different formats
  if (cleaned.startsWith('354') && cleaned.length === 10) {
    return true; // +354XXXXXXX
  } else if (cleaned.startsWith('00354') && cleaned.length === 12) {
    return true; // 00354XXXXXXX
  } else if (cleaned.length === 7) {
    return true; // XXXXXXX (local)
  }
  
  return false;
}

/**
 * Get phone number with country code
 * @param {string} phoneNumber - Local phone number
 * @returns {string} - Phone number with +354 prefix
 */
export function getIcelandPhoneWithCountryCode(phoneNumber) {
  if (!phoneNumber) return '';
  
  const cleaned = phoneNumber.replace(/\D/g, '');
  
  if (cleaned.startsWith('354')) {
    return `+${cleaned}`;
  } else if (cleaned.length === 7) {
    return `+354${cleaned}`;
  }
  
  return phoneNumber;
}

/**
 * Extract local number from full phone number
 * @param {string} phoneNumber - Full phone number
 * @returns {string} - Local 7-digit number
 */
export function getLocalIcelandPhone(phoneNumber) {
  if (!phoneNumber) return '';
  
  const cleaned = phoneNumber.replace(/\D/g, '');
  
  if (cleaned.startsWith('354')) {
    return cleaned.substring(3);
  } else if (cleaned.startsWith('00354')) {
    return cleaned.substring(5);
  } else if (cleaned.length === 7) {
    return cleaned;
  }
  
  return '';
}

/**
 * Iceland phone number constants
 */
export const ICELAND_PHONE = {
  countryCode: '354',
  countryCodeDisplay: '+354',
  localLength: 7,
  internationalLength: 10,
  format: 'XXX-XXXX'
};

/**
 * Common Iceland mobile prefixes
 */
export const ICELAND_MOBILE_PREFIXES = [
  '61', '62', '63', '64', '65', '66', '67', '68', '69', // GSM numbers
  '81', '82', '83', '84', '85', '86', '87', '88', '89'  // Additional mobile
];

/**
 * Common Iceland landline prefixes  
 */
export const ICELAND_LANDLINE_PREFIXES = [
  '42', '43', '44', '45', '46', '47', '48', '49', // Reykjavik area
  '51', '52', '53', '54', '55', '56', '57', '58', '59', // Other areas
  '41', '71', '72', '73', '74', '75', '76', '77', '78', '79' // Various regions
];

/**
 * Detect if phone number is mobile or landline
 * @param {string} phoneNumber - The phone number
 * @returns {string} - 'mobile', 'landline', or 'unknown'
 */
export function detectIcelandPhoneType(phoneNumber) {
  const localNumber = getLocalIcelandPhone(phoneNumber);
  if (!localNumber || localNumber.length !== 7) return 'unknown';
  
  const prefix = localNumber.substring(0, 2);
  
  if (ICELAND_MOBILE_PREFIXES.includes(prefix)) {
    return 'mobile';
  } else if (ICELAND_LANDLINE_PREFIXES.includes(prefix)) {
    return 'landline';
  }
  
  return 'unknown';
}

/**
 * Format phone input placeholder based on type
 * @param {string} language - Language code
 * @returns {string} - Placeholder text
 */
export function getIcelandPhonePlaceholder(language = 'is') {
  if (language === 'is') {
    return '581-2345'; // Example Icelandic number
  } else {
    return '581-2345'; // Same format for English
  }
}