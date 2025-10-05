/**
 * Creates a datetime by combining a date string with the current time
 * @param {string} dateString - Date in YYYY-MM-DD format
 * @returns {string} - ISO datetime string
 */
export function createDateTimeWithCurrentTime(dateString) {
  const now = new Date();
  const selectedDate = new Date(dateString);
  
  const mealDateTime = new Date(
    selectedDate.getFullYear(),
    selectedDate.getMonth(),
    selectedDate.getDate(),
    now.getHours(),
    now.getMinutes(),
    now.getSeconds()
  ).toISOString();
  
  return mealDateTime;
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
