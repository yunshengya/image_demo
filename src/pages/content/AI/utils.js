/**
 * 将日期对象或时间戳转换为年月日时分秒的字符串，如果不是当前年份则加上年份。
 * @param {Date | string | number} date - 要格式化的日期对象、日期字符串或时间戳
 * @returns {string} 格式化后的日期字符串
 */
export function formatDate(date) {
  // 如果是时间戳（数字或字符串），将其转换为 Date 对象
  if (typeof date === 'string' || typeof date === 'number') {
    date = new Date(Number(date));
  }

  // 确保 date 是有效的 Date 对象
  if (!(date instanceof Date) || isNaN(date.getTime())) {
    throw new TypeError('传入的参数必须是有效的 Date 对象');
  }

  const now = new Date();
  const isCurrentYear = date.getFullYear() === now.getFullYear();

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // 月份从0开始
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');

  return isCurrentYear
    ? `${month}-${day} ${hours}:${minutes}:${seconds}`
    : `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}
