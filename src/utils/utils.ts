/**
 * Determines the color based on the success rate.
 *
 * @param {number} successRate - The success rate percentage.
 * @returns {string} The color corresponding to the success rate.
 */
export const getSuccessColor = (successRate: number) => {
    if (successRate >= 90) return "#2ab5f6"; // Excellent
    if (successRate >= 80) return "#26a69a"; // Good
    if (successRate >= 60) return "#9ccc65"; // Fair
    if (successRate >= 40) return "#ffca26"; // Risky
    if (successRate >= 25) return "#ff8a64"; // Concerning
    return "#ee534f"; // Non-viable
};

/**
 * Determines the color based on the net estate value relative to the net worth at retirement.
 *
 * @param {number} netEstateValue - The net estate value.
 * @param {number} netWorthAtRetirement - The net worth at retirement.
 * @returns {string} The color corresponding to the net estate value relative to the net worth at retirement.
 */
export const getLegacyColor = (netEstateValue: number, netWorthAtRetirement: number) => {
    if (netEstateValue > 3 * netWorthAtRetirement) return "#26a69a"; // Large Surplus
    if (netEstateValue >= 0.5 * netWorthAtRetirement) return "#42a5f5"; // Comfortable
    return "#ffca26"; // Barely made it
};





