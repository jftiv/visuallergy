/**
 * Gets the current date and time in YYYY-MM-DDTHH:MM format for datetime-local input
 * @returns {string} - DateTime string in YYYY-MM-DDTHH:MM format
 */
export function getCurrentLocalDateTime() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  
  return `${year}-${month}-${day}T${hours}:${minutes}`;
}

/**
 * Gets today's date in YYYY-MM-DD format using the user's local timezone
 * @returns {string} - Date string in YYYY-MM-DD format
 */
export function getTodayLocalDate() {
  const today = new Date();
  return new Intl.DateTimeFormat('en-CA').format(today);
}

export function sortMealsByDate (meals, descending = true) {
  return meals.sort((a, b) => descending 
    ? new Date(b.date || new Date()) - new Date(a.date || new Date()) 
    : new Date(a.date || new Date()) - new Date(b.date || new Date()));
}

/**
 * Converts datetime-local format to MySQL datetime format
 * @param {string} datetimeLocal - DateTime string in YYYY-MM-DDTHH:MM format
 * @returns {string} - DateTime string in MySQL format (YYYY-MM-DD HH:MM:SS)
 */
export function formatForMySQL(datetimeLocal) {
  const date = new Date(datetimeLocal);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');
  
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}
