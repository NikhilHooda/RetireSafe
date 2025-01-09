/**
 * Formats a given numeric value representing an estate's net value into a string
 * with a suffix 'M' to denote millions, 'K' to denote thousands, or as is for zero,
 * rounded to one decimal place for millions and no decimal place for thousands.
 *
 * @param value - The numeric value to be formatted.
 * @returns A string representing the formatted net estate value.
 */
export const formatNetEstateValue = (value: number): string => {
    if (value === 0) return '0';
    if (value < 1000000) return `${Math.round(value / 1000)}K`;
    return `${(value / 1000000).toFixed(1)}M`;
};
