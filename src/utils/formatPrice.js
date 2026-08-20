/**
 * Format a number as a currency string
 * @param {number} amount
 * @param {string} currency
 * @returns {string} formatted price
 */
export const formatPrice = (amount, currency = 'USD') => {
  if (typeof amount !== 'number') {
    amount = parseFloat(amount) || 0;
  }
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
    maximumFractionDigits: 0
  }).format(amount);
};

export const formatPricePerMonth = (amount) => {
  return `${formatPrice(amount)}/mo`;
};

export default formatPrice;
