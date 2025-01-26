// Utility function to format currency with commas
export const formatCurrency = (amount) => {
  return Math.floor(amount) // Remove decimal places by flooring the value
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ","); // Add commas
};
